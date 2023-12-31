import React, { useRef, useState } from "react";
import { Storage } from "aws-amplify";
import "./UploaderPage.css";

export default function UploaderPage() {
  const [percentage, setPercentage] = useState("0%");
  const [cameraImage, setCameraImage] = useState("No image");
  const isMobile = window.navigator.userAgent.toLowerCase().includes("mobile");
  const uploadCamera = useRef<HTMLInputElement | null>(null);
  const uploadFile = useRef<HTMLInputElement | null>(null);

  const ChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    console.log(event.target.value);
    if (event.target.files) {
      let filename = event.target.files[0].name;
      if (filename === "image.jpg" || filename.length > 17) {
        const id = new Date().getTime().toString().slice(0, 12);
        filename = "image" + id + ".jpg";
      }
      console.log("filename", filename);
      setCameraImage(filename);
      Storage.put("input/" + filename, event.target.files[0], {
        level: "public",
        contentType: event.target.files[0].type,
        progressCallback(progress) {
          const percentage = (progress.loaded * 100) / progress.total;
          console.log(`progress: ${percentage}%`);
          setPercentage(`${percentage}%`);
        },
      }).then((result) => {
        console.log(`completed upload: ${result.key}`);
        event.target.value = "";
      });
    }
  };

  function onCaptureCamera() {
    if (uploadCamera.current) {
      uploadCamera.current.click();
    }
  }
  function onUploadFile() {
    if (uploadFile.current) {
      uploadFile.current.click();
    }
  }
  return (
    <>
      <div className="uploaderContainer">
        <div className="uploadCameraDiv">
          <input
            id="uploadCamera"
            type="file"
            name="image"
            accept="image/*"
            capture
            onChange={ChangeInput}
            ref={uploadCamera}
            disabled={!isMobile}
          />
          <button onClick={onCaptureCamera} disabled={!isMobile}>
            Take photo
          </button>
        </div>
        <div className="uploadFileDiv">
          <input
            id="uploadFile"
            type="file"
            name="image"
            accept="image/*"
            onChange={ChangeInput}
            ref={uploadFile}
          />
          <button onClick={onUploadFile}>Upload file</button>
        </div>
      </div>
      <div className="uploadPercentage">
        <p>{cameraImage}</p>
        <p>{percentage}</p>
      </div>
    </>
  );
}
