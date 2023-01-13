import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Feed from "./pages/Feed";
import Organizations from "./pages/Organizations";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDbData } from "./utilities/firebase";
import LogIn from "./pages/LogIn";
import { useProfile } from "./utilities/profile";
import "./App.css";

function App() {
  const [data, error] = useDbData("/"); // get whole database

  const [profile, profileLoading, profileError] = useProfile();
  const user = profile.user;
  console.log(profile.user);

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  const currentUserId = "27e416aa-8d61-11ed-a1eb-0242ac120002";
  // currentUser is an obj { clubs: <Array: clubIds>, name: <String> }
  const currentUserData = data.users[currentUserId];
  // allClubs is an array <Array: [clubId, clubData], ... >
  const allClubs = Object.entries(data.clubs);
  const currentClubsIds = Object.values(currentUserData.clubs);
  // currentClubs is an array [ [clubId, clubData]], ...  ]
  const currentClubs = Object.entries(data.clubs).filter(([id, value]) =>
    currentClubsIds.includes(id)
  );

  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<LogIn />}></Route>
        <Route
          exact
          path="/"
          element={ user ? 
              <Feed
                data={data}
                currentUserId={currentUserId}
                currentUserData={currentUserData}
                currentClubsIds={currentClubsIds}
                currentClubs={currentClubs}
              />
            :
              <Navigate replace to="/login" state={{inviteLink: window.location.search}}/>
          }
        ></Route>
        <Route
          exact
          path="/organizations"
          element={
            <Organizations
              data={data}
              currentUserId={currentUserId}
              currentUserData={currentUserData}
              currentClubsIds={currentClubsIds}
              allClubs={allClubs}
            />
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
