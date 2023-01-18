import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useDbUpdate } from "../../utilities/firebase";
import { useState } from "react";
import CreatePost from "../CreatePost/CreatePost";
import { Modal, FloatingLabel } from "react-bootstrap";

const AdminCard = ({
  clubId,
  clubData,
  currentClubsIds,
  currentUserData,
  currentUserId,
  data,
  msgSuccess,
  setMsgSuccess
}) => {
  const userInClub =
    clubData.members !== undefined
      ? clubData.members.includes(currentUserId)
      : false;

  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => {
    setMsgSuccess("");
    setModalShow(false);
  }
  const handleShow = () => setModalShow(true);

  return (
    <div>
      <Modal show={modalShow} onHide={handleClose}>
        <CreatePost
          currentUserData={currentUserData}
          clubId={clubId}
          data={data}
          clubData={clubData}
          modalShow={modalShow}
          handleClose={handleClose}
          msgSuccess={msgSuccess}
          setMsgSuccess={setMsgSuccess}
        ></CreatePost>
      </Modal>

      <Card className="post-card" style={{ width: "24rem" }}>
        <Card.Header>
          <div className="row">
            <div className="col-sm-8 post-header-text">
              <Card.Text className="post-club-name">{clubData.name}</Card.Text>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Text className="card-post-content">
            {clubData.description}
          </Card.Text>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {/* <Button variant="primary">
              Edit Club
            </Button> */}

            <Button variant="primary" onClick={handleShow}>
              Create Post
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminCard;
