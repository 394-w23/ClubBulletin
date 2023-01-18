import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useDbUpdate } from "../../utilities/firebase";



const ClubCard = ({ clubId, clubData, currentClubsIds, currentUserData, currentUserId, data }) => {  
  const [updateClub] = useDbUpdate(`/clubs/${clubId}`);
  const [updateUser] = useDbUpdate(`/users/${currentUserId}`);
  // console.log('clubData members', clubData.members);  
  const userInClub = clubData.members !== undefined ? clubData.members.includes(currentUserId) : false;
  const toggleClubSubscription = () => {    
    // toggle userId from clubs's members
      // if user is in club, return filtered list of members without the user
      // else return list of members with user added
    updateClub( { ["/members"]: userInClub 
                                ? clubData.members.filter((memberId) => (memberId !== currentUserId)) 
                                : [...clubData?.members, currentUserId] } );
    // toggle clubId from current
    updateUser( { ["/clubs"]: userInClub
                                ? currentUserData.clubs.filter((cId) => (cId !== clubId))
                                : [...currentUserData?.clubs, clubId] } );
  };

  //   

  return (
    <Card className="post-card my-3" >
      <Card.Header>
        <div className="row">
          <div className="col-sm-8 post-header-text">
            <Card.Text className="post-club-name">{clubData.name}</Card.Text>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Text className="card-post-content">{clubData.description}</Card.Text>
        <Button onClick={() => toggleClubSubscription()} variant={userInClub ? "danger" : "primary"}>
          {userInClub ? "Unsubscribe" : "Subscribe"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ClubCard;
