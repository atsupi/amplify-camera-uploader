import React from 'react';
import '@aws-amplify/ui-react/styles.css'; 
import './App.css';
import { Authenticator, Button } from '@aws-amplify/ui-react';
import { Storage } from 'aws-amplify';

function App() {
  const ChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    console.log(event.target.value);
    if (event.target.files) {
      let filename = event.target.files[0].name;
      if (filename === "image.jpg") {
        const id = new Date().getTime().toString();
        filename = "image" + id + ".jpg";
      }
      console.log("filename", filename);
      Storage.put("input/"+filename, event.target.files[0], {
        level: "public",
        contentType: event.target.files[0].type,
        progressCallback(progress) {
          const percentage = progress.loaded * 100 / progress.total;
          console.log(`progress: ${percentage}%`);
        }
      }).then((result) => {
        console.log(`completed upload: ${result.key}`);
      });  
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
      <Authenticator>
        {({signOut, user}) => (
          <>
            <p>Hello, {user?.username}</p>
            <Button onClick={signOut}>Sign Out</Button>
            <div className="upload">
              <input id="upload" type="file" name="image" accept="image/*" capture onChange={ChangeInput}></input>
            </div>
          </>
        )}
      </Authenticator>
    </div>
  );
}

export default App;
