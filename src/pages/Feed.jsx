import { useState, useEffect } from "react";
import Post from "../components/Post/Post";;
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
import ClubSelector from "../components/ClubSelector/ClubSelector";


const Feed = ({ data, currentUserData, currentClubsIds, currentClubs }) => {
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
            /> */}

            <div>
              <Link to="/organizations" relative="path">
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
