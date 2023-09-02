/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_DBREKOGNITION20230724_ARN
	STORAGE_DBREKOGNITION20230724_NAME
	STORAGE_DBREKOGNITION20230724_STREAMARN
Amplify Params - DO NOT EDIT */

import { DetectTextCommand } from "@aws-sdk/client-rekognition"; // ES Modules import
import { RekognitionClient } from "@aws-sdk/client-rekognition";
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'

// Set the AWS Region.
const REGION = "ap-northeast-1";
const rekognitionClient = new RekognitionClient({
  region: process.env.REGION
});

function isFloat(value) {
  return (
    typeof value === 'number' &&
    !Number.isInteger(value) &&
    !Number.isNaN(value) &&
    Number.isFinite(value)
  ) ? true : false;
}

function convert(text) {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    const char = text.charAt(i);
    if (char !== ' ') {
      result += char;
    }
  }
  return result;
}

const extractResponse = (res) => {
  const result = [];
  res.TextDetections.map((text) => {
    if (text.Type === "LINE") {
      const detectedText = convert(text.DetectedText);
      if (isFloat(Number(detectedText)) || Number(detectedText) > 999 ) {
        console.log("extract", text.DetectedText, detectedText);
        result.push(detectedText);
      }
    }
  });
  return (result);
};

const config = {};
const dbClient = new DynamoDBClient(config);
const documentClient = DynamoDBDocumentClient.from(dbClient);

const saveData = async (key, param1, param2, param3) => {
  console.log("saveData", process.env.STORAGE_DBREKOGNITION20230724_NAME);
  try {
    const command = new PutItemCommand({
      TableName: process.env.STORAGE_DBREKOGNITION20230724_NAME,
      Item: {
        "key": { "S" : key },
        "param1": { "S" : param1 },
        "param2": { "S" : param2 },
        "param3": { "S" : param3 },
        "date": { "S" : new Date().getTime().toString() },
        "type": { "S" : "calibration" },
      },
    });
    const output = await dbClient.send(command);
    console.log('SUCCESS (put item):', output);
  } catch (err) {
    console.log('ERROR:', err);
  }
}

export const handler = async function (event) {
  console.log('Received S3 event:', JSON.stringify(event, null, 2));
  const bucket = event.Records[0].s3.bucket.name;
  const key = event.Records[0].s3.object.key;
  console.log(`Bucket: ${bucket}`, `Key: ${key}`);

  const input = { // DetectTextRequest
    Image: { // Image
      S3Object: { // S3Object
        Bucket: bucket,
        Name: key,
      },
    },
    Filters: { // DetectTextFilters
      WordFilter: { // DetectionFilter
        MinConfidence: 70,
      },
    },
  };
  const command = new DetectTextCommand(input);
  const response = await rekognitionClient.send(command);
  console.log("lambda_handler", response);
  
  const result = extractResponse(response);
  console.log("result", result);

  if (result.length == 3) {
    console.log("saveData", "3 params");
    saveData(key, result[0], result[1], result[2]);
  } else {
    console.log("saveData", "0 params");
    saveData(key, 0, 0, 0);
  }   
};