import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useDbUpdate } from "../../utilities/firebase";
import { useState } from "react";
import CreatePost from "../CreatePost/CreatePost";
import DeleteClub from "../DeleteClub/DeleteClub";
import { Modal, FloatingLabel } from "react-bootstrap";

const AdminCard = ({
  clubId,
  clubData,
  currentClubsIds,
  currentUserData,
  currentUserId,
  data,
  deleteSuccess,
  setDeleteSuccess,
}) => {
  const userInClub =
    clubData.members !== undefined
      ? clubData.members.includes(currentUserId)
      : false;

  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => {
    setModalShow(false);
  };
  const handleShow = () => setModalShow(true);

  const [alertShow, setAlertShow] = useState(false);
  const alertClose = () => {
    setDeleteSuccess("");
    setAlertShow(false);
  };
  const handleAlert = () => setAlertShow(true);

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
        ></CreatePost>
      </Modal>

      <Modal show={alertShow} onHide={alertClose}>
        <DeleteClub
          currentUserData={currentUserData}
          clubId={clubId}
          data={data}
          clubData={clubData}
          modalShow={alertShow}
          handleClose={alertClose}
          deleteSuccess={deleteSuccess}
          setDeleteSuccess={setDeleteSuccess}
        ></DeleteClub>
      </Modal>

      <Card className="post-card my-3">
        <Card.Header>
          <div className="row">
            <div className="col-sm-1">
              <Card.Img
                src={clubData.picLink}
                className="post-profile-image"
              ></Card.Img>
            </div>
            <div className="col-sm-8 post-header-text">
              <Card.Text className="post-club-name" data-testid="admin-club-name">{clubData.name}</Card.Text>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Text className="card-post-content">
            {clubData.description}
          </Card.Text>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* <Button variant="primary">
              Edit Club
            </Button> */}

            <Button variant="primary" data-testid="create-post-button" onClick={handleShow}>
              Create Post
            </Button>
            <Button variant="danger" data-cy="delete-button" data-testid="delete-club-button" onClick={handleAlert}>
              Delete Club
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminCard;
