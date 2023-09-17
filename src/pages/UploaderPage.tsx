import React, { useState } from 'react';
import { Storage } from 'aws-amplify';
import "./UploaderPage.css";

export default function UploaderPage() {
    const [percentage, setPercentage] = useState("0%");
    const isMobile = window.navigator.userAgent.toLowerCase().includes("mobile");
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
        Storage.put("input/"+filename, event.target.files[0], {
          level: "public",
          contentType: event.target.files[0].type,
          progressCallback(progress) {
            const percentage = progress.loaded * 100 / progress.total;
            console.log(`progress: ${percentage}%`);
            setPercentage(`${percentage}%`);
          }
        }).then((result) => {
          console.log(`completed upload: ${result.key}`);
          event.target.value = "";
        });  
      }
    };

    return (
    <>
            <div className={isMobile? "uploadCameraDiv enabled": "uploadCameraDiv disabled"}>
              <input id="uploadCamera" type="file" name="image" accept="image/*" capture onChange={ChangeInput} disabled={!isMobile}></input>
              <p>{percentage}</p>
            </div>
            <div className="uploadFileDiv">
              <input id="uploadFile" type="file" name="image" accept="image/*" onChange={ChangeInput}></input>
              <p>{percentage}</p>
            </div>
    </>
  );
}
