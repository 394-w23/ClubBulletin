import ClubCard from "../components/ClubCard/ClubCard.jsx";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Navigation from "../components/Navigation/Navigation";
import SearchBar from "../components/SearchBar/SearchBar";

const Organizations = ({ user, data }) => {
  const currentUserId = user.uid
  const currentUserData = data.users[currentUserId];
  const currentClubsIds = Object.values(currentUserData.clubs);
  
  const allClubs = Object.entries(data.clubs);
  return (
    <div>
      <Container>
        <Navigation currentUserData={currentUserData} />        

        <div className="pageTitle">
          <h1>Subscribe to Clubs</h1>
        </div>
        <div className="org-title">
          <Link to="/" relative="path">
            <Button variant="outline-secondary">Back to feed</Button>
          </Link>
          <SearchBar />
          <Button href="/newclub" variant="outline-primary">Add New Club</Button>{' '}
        </div>

        <Row>
          <Col>
            {allClubs.map(([id, clubData]) => {
              return (
                <ClubCard key={id}
                  clubId={id}
                  clubData={clubData}
                  currentClubsIds={currentClubsIds}
                  currentUserData={currentUserData}
                  currentUserId={currentUserId}
                  data={data} />
              );
            })}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Organizations;
