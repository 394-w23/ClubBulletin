import ClubCard from "../components/ClubCard/ClubCard.jsx";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
const Organizations = ({ data, currentUserId, currentClubsIds, currentUser }) => {
  const allClubs = Object.entries(data.clubs);

  return (
    <div>
      <div>
          <Link to ="/" relative="path">
          <Button varient="primary">Back</Button>
          </Link>
        </div>
      <h1>Organization list: </h1>
      <Container>
        <Row>
          <Col>
            {allClubs.map(([id, club]) => {
              return (
                <ClubCard key={id}
                          clubId={id}
                          clubData={club}
                          currentClubsIds={currentClubsIds}
                          currentUser={currentUser}
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
