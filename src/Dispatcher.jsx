const Dispatcher = ({ data }) => {

  const [profile, profileLoading, profileError] = useProfile();

  
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
        <Route exact path="/login" element={user ?
          <Navigate replace to="/" state={{ inviteLink: window.location.search }} /> :
          <LogIn />}>
        </Route>
        <Route
          exact
          path="/"
          element={user ?
            <Feed
              data={data}
              currentUserId={currentUserId}
              currentUserData={currentUserData}
              currentClubsIds={currentClubsIds}
              currentClubs={currentClubs}
            />
            :
            <Navigate replace to="/login" state={{ inviteLink: window.location.search }} />
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