import { useState, useEffect } from "react";
import Post from "../components/Post/Post";;
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
import { useDbData, useDbUpdate } from "../utilities/firebase";

const Feed = ({ user, data }) => {
  const [selection, setSelection] = useState("ALL");

  const allPosts = Object.entries(data.posts);

  const filteredClubIds = selection.id === "ALL" ? currentClubsIds : [selection.id];

  const currentUserId = user.uid
  // something something postId to delete posts later (warning)
  if (data.users[currentUserId] === undefined) {
    const [updateDb] = useDbUpdate('/');
    updateDb( { ['/users']: {
      ...data.users, 
      [user.uid]: {'clubs': [''], ['name']: user.displayName},
      
    } } );    
  }

  const currentUserData = data.users[currentUserId];
  // allClubs is an array <Array: [clubId, clubData], ... >
  const allClubs = Object.entries(data.clubs);
  const currentClubsIds = Object.values(currentUserData.clubs);
  // currentClubs is an array [ [clubId, clubData]], ...  ]
  const currentClubs = Object.entries(data.clubs).filter(([id, value]) =>
    currentClubsIds.includes(id)
  );
  const filteredClubIds = selection === "ALL" ? currentClubsIds : [selection];
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
            {/* <ClubSelector
              clubs={currentClubs}
              selection={selection}
              setSelection={setSelection}
            />
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
