import "@aws-amplify/ui-react/styles.css";
import "./App.css";
import { Authenticator, Button } from "@aws-amplify/ui-react";
import NavBar from "./components/NavBar";
import UploaderPage from "./pages/UploaderPage";
import ListPage from "./pages/ListPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Camera Uploader</p>
      </header>
      <main className="App-main">
        <Authenticator>
          {({ signOut, user }) => (
            <>
              <div className="UserContent">
                <p>Hello, {user?.username}</p>
                <Button onClick={signOut}>Sign Out</Button>
              </div>
              <main className="Main">
                <BrowserRouter>
                  <NavBar />
                  <div className="MainContent">
                    <Routes>
                      <Route index path="/" element={<ListPage items={[]} />} />
                      <Route path="/upload" element={<UploaderPage />} />
                    </Routes>
                  </div>
                </BrowserRouter>
              </main>
            </>
          )}
        </Authenticator>
      </main>
    </div>
  );
}

export default App;
