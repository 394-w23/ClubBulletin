import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useDbUpdate } from "../../utilities/firebase";

const ClubCard = ({
  clubId,
  clubData,
  currentClubsIds,
  currentUserData,
  currentUserId,
  data,
}) => {
  const userInClub =
    clubData.members !== undefined
      ? clubData.members.includes(currentUserId)
      : false;

  return (
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

        <Button variant="primary">Edit</Button>
        <Button variant="primary">Create Post</Button>
      </Card.Body>
    </Card>
  );
};

export default ClubCard;
