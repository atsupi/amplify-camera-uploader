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
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
      <Authenticator>
        {({ signOut, user }) => (
          <>
            <p>Hello, {user?.username}</p>
            <Button onClick={signOut}>Sign Out</Button>
            <main className="Main">
              <BrowserRouter>
                <NavBar />
                <div className="MainContent">
                  <Routes>
                    <Route index path="/" element={<ListPage items={[]}/>} />
                    <Route path="/upload" element={<UploaderPage />} />
                  </Routes>
                </div>
              </BrowserRouter>
            </main>
          </>
        )}
      </Authenticator>
    </div>
  );
}

export default App;
