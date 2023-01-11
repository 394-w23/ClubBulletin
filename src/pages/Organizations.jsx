import ClubCard from "../components/ClubCard/ClubCard.jsx"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Organizations = ({data, error, currentClubs}) => {
  const allClubs = Object.entries(data.clubs);

  return (
    <div>
      <h1>Orgs list: </h1>
      <Container>
        <Row>
          <Col>
            {allClubs.map(([id, club]) => {
              return <ClubCard key={id} club={club} />;
            })}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Organizations;
