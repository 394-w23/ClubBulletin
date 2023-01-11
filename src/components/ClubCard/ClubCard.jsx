import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { unsubscribeFromClub } from "../../utilities/firebase";

const ClubCard = ({ id, club, currentClubs, user, data }) => {
  const isUserInClub = currentClubs.map(([id]) => id).includes(id)
    ? true
    : false;

  const userId = "27e416aa-8d61-11ed-a1eb-0242ac120002";

  //   unsubscribeFromClub(data, userId, id);

  return (
    <Card class="post-card" style={{ width: "24rem" }}>
      <Card.Header>
        <div class="row">
          <div class="col-sm-8 post-header-text">
            <Card.Text class="post-club-name">{club.name}</Card.Text>
          </div>
        </div>
      </Card.Header>

      <Card.Body>
        <Card.Text class="card-post-content">{club.description}</Card.Text>

        <Button variant={isUserInClub ? "danger" : "primary"}>
          {isUserInClub ? "Unsubscribe" : "Subscribe"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ClubCard;
