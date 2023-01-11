import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useDbUpdate } from "../../utilities/firebase";



const ClubCard = ({ id, club, currentClubs, user, data }) => {
  const [updateClubMembers, resultClubMembers] = useDbUpdate(
    `/users/clubs/${id}/members`
  );

  const [updateUserClubs, resultUserClubs] = useDbUpdate(
    `/users/27e416aa-8d61-11ed-a1eb-0242ac120002/clubs`
  );
  const UnsubscribeFromClub = (data, userId, clubId) => {
    
    console.log('hi');
    const currentClubs = data.users[userId].clubs;
    console.log('made it');
    const updatedClubs = currentClubs.filter(
      (currentClubId) => currentClubId != clubId
    );
  
    // console.log("updated:", updatedClubs);
    ;
    updateUserClubs(Object.assign({}, updatedClubs));
  
    return 0;
  };
  const isUserInClub = currentClubs.map(([id]) => id).includes(id)
    ? true
    : false;

  const userId = "27e416aa-8d61-11ed-a1eb-0242ac120002";

  //   

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

        <Button onClick={() => UnsubscribeFromClub(data, userId, id)} variant={isUserInClub ? "danger" : "primary"}>
          {isUserInClub ? "Unsubscribe" : "Subscribe"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ClubCard;
