import { useState, useEffect } from "react";
import Post from "../components/Post/Post";;
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
import { useDbData, useDbUpdate } from "../utilities/firebase";
import ClubSelector from "../components/ClubSelector/ClubSelector";

const Feed = ({ user, data }) => {
  const [selection, setSelection] = useState({id:'all'});

  const currentUserId = user.uid;

  // something something postId to delete posts later (warning)
  if (data.users[currentUserId] === undefined) {
    const [updateDb] = useDbUpdate('/');
    updateDb( { ['/users']: {
      ...data.users, 
      [user.uid]: {'clubs': [''], ['name']: user.displayName},
      
    } } );    
  }

  const allPosts = Object.entries(data.posts);
  const currentUserData = data.users[currentUserId];
  const currentClubsIds = Object.values(currentUserData.clubs);
  const filteredClubIds = selection.id === "all" ? currentClubsIds : [selection.id];  

  
  // allClubs is an array <Array: [clubId, clubData], ... >
  const allClubs = Object.entries(data.clubs);  
  // currentClubs is an array [ [clubId, clubData]], ...  ]
  const currentClubs = Object.entries(data.clubs).filter(([id, value]) =>
    currentClubsIds.includes(id)
  );
  console.log(currentClubs);
  
  const filteredPosts = allPosts.filter(([id, value]) =>
    filteredClubIds.includes(value.clubId)
  );


  return (
    <div className="App">
      <Container>
        <Navigation currentUserData={currentUserData} />
        <h1>Your Feed</h1>
        <ClubSelector
          currentClubs={currentClubs}
          selection={selection}
          setSelection={setSelection}
        />

        <Row>
          <Col>            
            <div>
              <Link to ="/organizations" relative="path">
              <Button varient="primary">Manage</Button>
              </Link>
            </div>
            {filteredPosts.map(([id, post]) => {
              const currentClub = data.clubs[post.clubId];

              return (
                <Post key={id} post={post} postId={id} club={currentClub} />
              );
            })}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Feed;
