import { useState, useEffect } from "react";
import { useDbData } from "../utilities/firebase";
import Post from "../components/Post/Post";
import ClubSelector from "../components/ClubSelector/ClubSelector";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Feed = () => {
  const [data, error] = useDbData("/"); // get whole database
  const [selection, setSelection] = useState("ALL");

  // console.log("selection:", selection);
  // console.log("initial value", initialValue);

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  const currentUser = data.users["27e416aa-8d61-11ed-a1eb-0242ac120002"];
  const currentClubsIds = Object.values(currentUser.clubs);
  const currentClubs = Object.entries(data.clubs).filter(([id, value]) =>
    currentClubsIds.includes(id)
  );
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
