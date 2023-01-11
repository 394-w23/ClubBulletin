import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useDbUpdate } from "../../utilities/firebase";



const ClubCard = ({ clubId, clubData, currentClubsIds, currentUser, currentUserId, data }) => {  
  const [updateClub, resultClubMembers] = useDbUpdate(`/clubs/${clubId}`);
  const [updateUser, resultUserClubs] = useDbUpdate(`/users/${currentUserId}`);
  // console.log(clubData);
  const userInClub = clubData.members.includes(currentUserId);
  const toggleClubSubscription = () => {    
    // remove club id from user's clubs
      // if user is in club, return filtered list of members without the user
      // else return list of members with user added
    // updateClub( {["/members"]: userInClub ? clubData.members} )
    // remove user from club members
    // const newUserData = {...currentUser, [clubs]: }
    // const newClubData = {}


    const currentClubs = data.users[userId].clubs;
    console.log('made it');
    const updatedClubs = currentClubs.filter(
      (currentClubId) => currentClubId != clubId
    );
  
    console.log("updated:", updatedClubs);
    const out = {};
    Object.assign(out, updatedClubs);
    updateUserClubs(out);
  
    return 0;
  };

  //   

  return (
    <Card class="post-card" style={{ width: "24rem" }}>
      <Card.Header>
        <div class="row">
          <div class="col-sm-8 post-header-text">
            <Card.Text class="post-club-name">{clubData.name}</Card.Text>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Text class="card-post-content">{clubData.description}</Card.Text>
        <Button onClick={() => toggleClubSubscription()} variant={userInClub ? "danger" : "primary"}>
          {userInClub ? "Unsubscribe" : "Subscribe"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ClubCard;
