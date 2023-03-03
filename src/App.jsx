import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Feed from "./pages/Feed";
import Organizations from "./pages/Organizations";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDbData, useDbUpdate } from "./utilities/firebase";
import LogIn from "./pages/LogIn";
import { useProfile } from "./utilities/profile";
import NewClub from "./pages/NewClub";
import ManageClubs from "./pages/ManageClubs";
import UploadTest from "./pages/UploadTest";

function App() {
  const [data, error] = useDbData("/"); // get whole database
  const [profile, profileLoading, profileError] = useProfile();
  const user = profile.user;

  // console.log(profile.user);

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/login"
          element={
            user ? (
              <Navigate
                replace
                to="/"
                state={{ inviteLink: window.location.search }}
              />
            ) : (
              <LogIn />
            )
          }
        />
        <Route
          exact
          path="/"
          element={
            user ? (
              <Feed user={user} data={data} />
            ) : (
              <Navigate
                replace
                to="/login"
                state={{ inviteLink: window.location.search }}
              />
            )
          }
        />
        <Route
          exact
          path="/organizations"
          element={<Organizations user={user} data={data} />}
        />

        <Route
          exact
          path="/manageclubs"
          element={<ManageClubs user={user} data={data} />}
        />

        <Route
          exact
          path="/newclub"
          element={<NewClub user={user} data={data} />}
        />
        <Route
          exact
          path="/uploadtest"
          element={<UploadTest user={user} data={data} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
