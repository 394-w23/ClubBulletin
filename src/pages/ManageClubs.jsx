import AdminCard from "../components/AdminCard/AdminCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Navigation from "../components/Navigation/Navigation";
import CreatePost from "../components/CreatePost/CreatePost";
import { Modal, FloatingLabel } from "react-bootstrap";
import { useState } from "react";

const ManageClubs = ({ user, data }) => {
  const currentUserId = user.uid;
  const currentUserData = data.users[currentUserId];
  const currentClubsIds = Object.values(currentUserData.clubs);

  const allClubs = Object.entries(data.clubs);

  const allAdminClubs = allClubs.filter(([id, value]) =>
    value.admins.includes(currentUserId)
  );
  const [modalShow, setModalShow] = useState(false);
  console.log(modalShow);

  return (
    <div>
      {allAdminClubs.map(([id, value]) => (<Modal show={modalShow} key={id}><CreatePost currentUserData={currentUserData} clubId={id} data={data} clubData={value} /></ Modal>)) }
      <Container>
        <Navigation currentUserData={currentUserData} />
        <div className="org-title">
          <h1>Organizations list</h1>
          <Button href="/newclub" variant="outline-primary">
            Add New Club
          </Button>{" "}
        </div>
        <Link to="/" relative="path">
          <Button varient="primary">Back</Button>
        </Link>
        <Row>
          <Col>
            {allAdminClubs.map(([id, clubData]) => {
              return (
                <AdminCard
                  key={id}
                  clubId={id}
                  clubData={clubData}
                  currentClubsIds={currentClubsIds}
                  currentUserData={currentUserData}
                  currentUserId={currentUserId}
                  data={data}
                  modalShow={modalShow}
                  setModalShow={setModalShow}
                />
              );
            })}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ManageClubs;
