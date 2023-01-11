import { useState, useEffect } from "react";
import { useDbData } from "../utilities/firebase";
import Post from "../components/Post/Post";
import ClubSelector from "../components/ClubSelector/ClubSelector";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

const Feed = ({data, currentUser, currentClubsIds, currentClubs}) => {
  const [selection, setSelection] = useState("ALL");

  // console.log("selection:", selection);
  // console.log("initial value", initialValue);

  const allPosts = Object.entries(data.posts);

  const filteredClubIds = selection === "ALL" ? currentClubsIds : [selection];

  const filteredPosts = allPosts.filter(([id, value]) =>
    filteredClubIds.includes(value.clubId)
  );
  // something something postId to delete posts later (warning)

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <ClubSelector
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

              return <Post key={id} post={post} club={currentClub} />;
            })}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Feed;
