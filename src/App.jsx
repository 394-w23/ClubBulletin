import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feed from "./pages/Feed";
import Organizations from "./pages/Organizations";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDbData } from "./utilities/firebase";

import "./App.css";

function App() {
  const [data, error] = useDbData("/"); // get whole database

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;
  const currentUser = data.users["27e416aa-8d61-11ed-a1eb-0242ac120002"];
  const currentClubsIds = Object.values(currentUser.clubs);
  const currentClubs = Object.entries(data.clubs).filter(([id, value]) =>
    currentClubsIds.includes(id)
  );

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Feed data={data} error={error} currentUser={currentUser} currentClubsIds={currentClubsIds} currentClubs={currentClubs}/>}></Route>
        <Route exact path="/organizations" element={<Organizations data={data} error={error} currentClubs={currentClubs}/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
