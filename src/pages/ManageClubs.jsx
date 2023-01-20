import AdminCard from "../components/AdminCard/AdminCard";
import Container from "react-bootstrap/Container";
import ClubCard from "../components/ClubCard/ClubCard.jsx";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Navigation from "../components/Navigation/Navigation";
import Alert from 'react-bootstrap/Alert';
import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import NewClub from "./NewClub";

const ManageClubs = ({ user, data }) => {
  const tabOptions = ["subscribed", "admin"];
  const [selection, setSelection] = useState(tabOptions[0]);
  const [deleteSuccess, setDeleteSuccess] = useState();
  const currentUserId = user.uid;
  const currentUserData = data.users[currentUserId];
  const currentClubsIds = Object.values(currentUserData.clubs);
  console.log(currentClubsIds);
  currentClubsIds.shift();
  const allClubs = Object.entries(data.clubs);
  const allClubsIds = allClubs.map(([id, value]) => id)
  const allAdminClubs = allClubs.filter(([id, value]) =>
    value.admins.includes(currentUserId)
  );
  const allAdminClubIds = allAdminClubs.map(([id, value]) => id);
  const allSubscribedClubs = currentClubsIds.filter((id) =>
    (!(allAdminClubIds.includes(id)) && allClubsIds.includes(id))
  );
  const isActive = (tab) => {
    if (tab === selection) {
      return "nav-link active";
    }
    return "nav-link";
  }

  // Modal variables
  const [newClubModalShow, setNewClubModalShow] = useState(false);
  const handleClose = () => {
    setNewClubModalShow(false);
  }
  const handleShow = () => setNewClubModalShow(true);

  const [alertShow, setAlertShow] = useState(false);
  const alertClose = () => {
    setDeleteSuccess("");
    setAlertShow(false);
  }
  const handleAlert = () => setAlertShow(true);

  return (
    <div>
      <Container>
        <Navigation currentUserData={currentUserData} />

        <div className="org-title" style={{ marginBottom: "50px" }}>
          <Link to="/" relative="path">
            <Button variant="outline-secondary">Back to feed</Button>
          </Link>
          <h1>Manage Clubs</h1>
          <Modal show={newClubModalShow} onHide={handleClose}>
            <NewClub
              data={data}
              user={user}
              handleClose={handleClose}
            ></NewClub>
          </Modal>
          <Button href="/newclub" variant="outline-primary">
            Add New Club
          </Button>{" "}
        </div>
        {/* <div className="pageTitle" >
          
        </div> */}
        <ul className="nav nav-tabs">
          <li
            className="nav-item"
            id={tabOptions[0]}
            autoComplete="off"
          >
            <a className={isActive(tabOptions[0])} aria-current="page" key="2" onClick={() => setSelection(tabOptions[0])}>Subscribed Clubs</a>
          </li>
          <li
            className="nav-item"
            id={tabOptions[1]}
            autoComplete="off"
          >
            <a className={isActive(tabOptions[1])} aria-current="page" key="1" onClick={() => setSelection(tabOptions[1])}>Admin Clubs</a>
          </li>
        </ul>
        {/* fix width of alert */}

        {selection == tabOptions[0] &&
          <Row>
            <Col>
              {allSubscribedClubs.map((id) => {
                console.log("clubId", id);
                const clubData = data.clubs[id];
                console.log("allclubs", data.clubs);
                return (
                  <ClubCard key={id}
                    clubId={id}
                    clubData={clubData}
                    currentClubsIds={currentClubsIds}
                    currentUserData={currentUserData}
                    currentUserId={currentUserId}
                    data={data} />
                );
              })}
            </Col>
          </Row>
        }
        {selection == tabOptions[1] &&
          <Row>
            <div width="70px" align="center">
              {deleteSuccess == "success" && <Alert key="success" variant="success">
                Club was successfully deleted!
              </Alert>
              }</div>
            <Col>
              {allAdminClubs.length !== 0 ? allAdminClubs.map(([id, clubData]) => {
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
              }
              ) : <div className="text-center m-3">Clubs that you are an admin for will appear here. Add a new club to get started.</div>
              }
            </Col>
          </Row>
        }



      </Container>
    </div>
  );
};

export default ManageClubs;
