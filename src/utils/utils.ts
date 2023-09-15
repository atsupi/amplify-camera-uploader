import { API, Storage, graphqlOperation } from "aws-amplify";
import { deleteMeasData } from "../graphql/mutations";


export async function getPresignedUrl(key: any) {
    const presignedUrl = await Storage.get(key, { level: "public" });
    return presignedUrl;
  }
  
  

const removeItemFromTable = (id: string) => {
    console.log("removeItemFromTable", id);
    removeItemFromDB(id);
}

async function removeItemFromDB(id: string) {
    try {
      const res = await API.graphql(
        graphqlOperation(deleteMeasData, { input: { id: id} })
      );
    } catch (event) {
      console.log(event);
    }
  }
  
export {removeItemFromDB, removeItemFromTable}
