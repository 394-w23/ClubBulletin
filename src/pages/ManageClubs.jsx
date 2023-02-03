import AdminCard from "../components/AdminCard/AdminCard";
import Container from "react-bootstrap/Container";
import ClubCard from "../components/ClubCard/ClubCard.jsx";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Navigation from "../components/Navigation/Navigation";
import Alert from "react-bootstrap/Alert";
import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import NewClub from "./NewClub";
import "../styles/ManageClubs.css";
import SearchBar from "../components/SearchBar/SearchBar";
import "../styles/manageClubs.scss"
const ManageClubs = ({ user, data }) => {
  const tabOptions = ["subscribed", "admin", "join"];
  const [selection, setSelection] = useState(tabOptions[2]);
  const [deleteSuccess, setDeleteSuccess] = useState();
  const currentUserId = user.uid;
  const currentUserData = data.users[currentUserId];
  const currentClubsIds = Object.values(currentUserData.clubs);
  currentClubsIds.shift();
  const [query, setQuery] = useState({ values: { Search: "" } });
  const allClubs = Object.entries(data.clubs);
  const filteredClubs =
    query.values.Search === undefined
      ? allClubs
      : allClubs.filter(([, val]) =>
          val.name.toLowerCase().includes(query.values.Search)
        );
  const allClubsIds = filteredClubs.map(([id, value]) => id);

  const allAdminClubs = filteredClubs.filter(([id, value]) =>
    value.admins.includes(currentUserId)
  );
  const allAdminClubIds = allAdminClubs.map(([id, value]) => id);
  const allSubscribedClubs = currentClubsIds.filter(
    (id) => !allAdminClubIds.includes(id) && allClubsIds.includes(id)
  );
  const notSubscribedClubs = allClubsIds.filter(
    (id) => (!allSubscribedClubs.includes(id) && !allAdminClubIds.includes(id))
  );

  const sortedClubs = filteredClubs.sort(function (club1, club2) {
    if (club1[1].name < club2[1].name) {
      return -1;
    }
    return 0;
  });

  const isActive = (tab) => {
    if (tab === selection) {
      return "nav-link active";
    }
    return "nav-link";
  };
  const isSubscribedClubsEmpty = allSubscribedClubs.length == 0;

  // Modal variables
  const [newClubModalShow, setNewClubModalShow] = useState(false);
  const handleClose = () => {
    setNewClubModalShow(false);
  };
  const handleShow = () => setNewClubModalShow(true);

  const [alertShow, setAlertShow] = useState(false);
  const alertClose = () => {
    setDeleteSuccess("");
    setAlertShow(false);
  };
  const handleAlert = () => setAlertShow(true);

  return (
    <div>
      <Container>
        <Navigation currentUserData={currentUserData} currentLabel="Clubs" />
        <h1 className="pageTitle" data-cy="manageClubs">Manage Clubs</h1>

        <div className="org-title" style={{ marginBottom: "10px" }}>
          <Link to="/" relative="path">
            <Button className="mobile" variant="outline-secondary">
              Back to Feed
            </Button>
          </Link>
          <Modal show={newClubModalShow} onHide={handleClose}>
            <NewClub
              data={data}
              user={user}
              handleClose={handleClose}
            ></NewClub>
          </Modal>
          <Button
            className="mobile"
            variant="outline-primary"
            onClick={handleShow}
          >
            Add New Club
          </Button>
        </div>
        <div className="org-search">
            <SearchBar query={query} setQuery={setQuery} />
        </div>
        <ul className="nav nav-tabs">
          <li className="nav-item" id={tabOptions[2]} autoComplete="off">
            <a
              className={isActive(tabOptions[2])}
              aria-current="page"
              key="3"
              onClick={() => setSelection(tabOptions[2])}
            >
              Join Clubs
            </a>
          </li>
          <li className="nav-item" id={tabOptions[0]} autoComplete="off">
            <a
              className={isActive(tabOptions[0])}
              aria-current="page"
              key="2"
              onClick={() => setSelection(tabOptions[0])}
            >
              Subscribed Clubs
            </a>
          </li>
          <li className="nav-item" id={tabOptions[1]} autoComplete="off">
            <a
              className={isActive(tabOptions[1])}
              aria-current="page"
              key="1"
              onClick={() => setSelection(tabOptions[1])}
            >
              Admin Clubs
            </a>
          </li>
        </ul>
        {/* fix width of alert */}

        {selection == tabOptions[0] && (
          <Row>
            <Col>
              {
              isSubscribedClubsEmpty ? <div className="text-center m-3">
              You aren't subscribed to any clubs yet!
              </div> :
              allSubscribedClubs.map((id) => {
                console.log("clubId", id);
                const clubData = data.clubs[id];
                console.log("allclubs", data.clubs);
                return (
                  <ClubCard
                    key={id}
                    clubId={id}
                    clubData={clubData}
                    currentClubsIds={currentClubsIds}
                    currentUserData={currentUserData}
                    currentUserId={currentUserId}
                    data={data}
                  />
                );
              })
              }
            </Col>
          </Row>
        )}
        {selection == tabOptions[1] && (
          <Row>
            <div width="70px" align="center">
              {deleteSuccess == "success" && (
                <Alert key="success" variant="success">
                  Club was successfully deleted!
                </Alert>
              )}
            </div>
            <Col>
              {allAdminClubs.length !== 0 ? (
                allAdminClubs.map(([id, clubData]) => {
                  return (
                    <AdminCard
                      key={id}
                      clubId={id}
                      clubData={clubData}
                      currentClubsIds={currentClubsIds}
                      currentUserData={currentUserData}
                      currentUserId={currentUserId}
                      data={data}
                      deleteSuccess={deleteSuccess}
                      setDeleteSuccess={setDeleteSuccess}
                    />
                  );
                })
              ) : (
                <div className="text-center m-3">
                  Clubs that you are an admin for will appear here. Add a new
                  club to get started.
                </div>
              )}
            </Col>
          </Row>
        )}
        {selection == tabOptions[2] && (
          <Row>
            <Col>
              {notSubscribedClubs.map((id) => {
                const clubData = data.clubs[id];
                return (
                  <ClubCard
                    key={id}
                    clubId={id}
                    clubData={clubData}
                    currentClubsIds={currentClubsIds}
                    currentUserData={currentUserData}
                    currentUserId={currentUserId}
                    data={data}
                  />
                );
              })}
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default ManageClubs;
