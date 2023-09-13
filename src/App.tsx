import "@aws-amplify/ui-react/styles.css";
import "./App.css";
import { Authenticator, Button } from "@aws-amplify/ui-react";
import NavBar from "./components/NavBar";
import UploaderPage from "./pages/UploaderPage";
import ListPage from "./pages/ListPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { listMeasData } from "./graphql/queries";
import { GraphQLResult } from "@aws-amplify/api-graphql";

class listMeasDataResponse {
  "data": any;
}

function App() {
  const [measTable, setMeasTable] = useState([]);

  async function fetchMeasData() {
    const apiData: GraphQLResult<any> = await API.graphql({
      query: listMeasData,
    });
    setMeasTable(apiData.data.listMeasData.items);
  }

  useEffect(() => {
    fetchMeasData();
  }, []);

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
                    <Route index path="/" element={<ListPage items={measTable}/>} />
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
