import ClubCard from "../components/ClubCard/ClubCard.jsx";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Navigation from "../components/Navigation/Navigation";
import SearchBar from "../components/SearchBar/SearchBar";
import { useState } from "react";

const Organizations = ({ user, data }) => {
  const currentUserId = user.uid;
  const currentUserData = data.users[currentUserId];
  const currentClubsIds = Object.values(currentUserData.clubs);
  const allClubs = Object.entries(data.clubs);

  const [query, setQuery] = useState({ values: { Search: "" } });
  const filteredClubs =
    query.values.Search === undefined
      ? allClubs
      : allClubs.filter(([, val]) =>
          val.name.toLowerCase().includes(query.values.Search)
        );

  const sortedClubs = filteredClubs.sort(function(club1, club2) {
    if (club1[1].name < club2[1].name) {
      return -1;
    }
    return 0;
  });

  return (
    <div>
      <Container>
        <Navigation
          currentUserData={currentUserData}
          currentLabel="Subscribe"
        />

        <h1 className="pageTitle">Subscribe to Clubs</h1>
        <div className="org-title">
          <Link to="/" relative="path">
            <Button variant="outline-secondary">Back to feed</Button>
          </Link>
          <SearchBar query={query} setQuery={setQuery} />
        </div>

        <Row>
          <Col>
            {sortedClubs.map(([id, clubData]) => {
              return (
                <ClubCard
                  key={id}
                  clubId={id}
                  clubData={clubData}
                  currentClubsIds={currentClubsIds}
                  currentUserData={currentUserData}
                  currentUserId={currentUserId}
                  data={data}
                />
              );
            })}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Organizations;
