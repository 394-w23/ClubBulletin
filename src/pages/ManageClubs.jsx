import AdminCard from "../components/AdminCard/AdminCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Navigation from "../components/Navigation/Navigation";
import Alert from 'react-bootstrap/Alert';
import { useState, useEffect } from "react";

const ManageClubs = ({ user, data }) => {
  const [selection, setSelection] = useState("subscribed");
  const [deleteSuccess, setDeleteSuccess] = useState();
  const currentUserId = user.uid;
  const currentUserData = data.users[currentUserId];

  const currentClubsIds = Object.values(currentUserData.clubs); // clubs you're subscribed to
  const allClubs = Object.entries(data.clubs);
  const allAdminClubs = allClubs.filter(([id, value]) =>
    value.admins.includes(currentUserId)
  );
  
  const isActive = (tab) => {
    if (tab === selection) {
      return "nav-link active";
    }
    return "nav-link";
  }

  return (
    <div>
      <Container>
        <Navigation currentUserData={currentUserData} />

        <div className="pageTitle">
          <h1>Manage Clubs</h1>
        </div>
        <div className="org-title">
          <Link to="/" relative="path">
            <Button variant="outline-secondary">Back to feed</Button>
          </Link>

          <Button href="/newclub" variant="outline-primary">
            Add New Club
          </Button>{" "}
        </div>
        <ul className="nav nav-tabs">
          <li
            className="nav-item"
            id="subscribed"
            autoComplete="off"
          >
            <a className={isActive("subscribed")} aria-current="page" key="2" onClick={() => setSelection("subscribed")}>Subscribed Clubs</a>
          </li>
          <li
            className="nav-item"
            id="admin"
            autoComplete="off"
          >
            <a className={isActive("admin")} aria-current="page" key="1" onClick={() => setSelection("admin")}>Admin Clubs</a>
          </li>
        </ul>
        {/* fix width of alert */}
        <div width="70px" align="center">{deleteSuccess == "success" && <Alert key="success" variant="success">
          Club was successfully deleted!
        </Alert>
        }</div>
        <Row>
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
      </Container>
    </div>
  );
};

export default ManageClubs;
