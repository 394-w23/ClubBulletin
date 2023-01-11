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
  const currentUserId = "27e416aa-8d61-11ed-a1eb-0242ac120002";
  // currentUser is an obj { clubs: <Array: clubIds>, name: <String> }
  const currentUser = data.users[currentUserId];
  const allClubs = data.clubs;
  const currentClubsIds = Object.values(currentUser.clubs);
  // currentClubs is an array [ [clubId, clubData]], ...  ]
  const currentClubs = Object.entries(data.clubs).filter(([id, value]) =>
    currentClubsIds.includes(id)
  );

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Feed data={data} 
                                             currentUserId={currentUserId}        
                                             currentUser={currentUser} 
                                             currentClubsIds={currentClubsIds} 
                                             currentClubs={currentClubs}/>}>                          
        </Route>
        <Route exact path="/organizations" element={<Organizations data={data} 
                                                                   currentUserId={currentUserId} 
                                                                   currentUser={currentUser} 
                                                                   currentClubsIds={currentClubsIds}
                                                                   allClubs={allClubs}/>}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
