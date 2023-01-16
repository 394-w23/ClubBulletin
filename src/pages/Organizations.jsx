import ClubCard from "../components/ClubCard/ClubCard.jsx";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Navigation from "../components/Navigation/Navigation";

const Organizations = ({ user, data }) => {
  const currentUserId = user.uid
  const currentUserData = data.users[currentUserId];
  const currentClubsIds = Object.values(currentUserData.clubs);
  const allClubs = Object.entries(data.clubs);
  return (
    <div>            
      <Container>
        <Navigation currentUserData={currentUserData} />
        <h1>Organizations list</h1>
        <Link to ="/" relative="path">
            <Button varient="primary">Back</Button>
        </Link>
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
