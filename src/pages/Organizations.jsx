import ClubCard from "../components/ClubCard/ClubCard.jsx";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
const Organizations = ({ data, error, currentClubs }) => {
  const allClubs = Object.entries(data.clubs);
  const currentUser = data.users["27e416aa-8d61-11ed-a1eb-0242ac120002"];

  return (
    <div>
      <div>
          <Link to ="/" relative="path">
          <Button varient="primary">Back</Button>
          </Link>
        </div>
      <h1>Orgs list: </h1>
      <Container>
        <Row>
          <Col>
            {allClubs.map(([id, club]) => {
              return (
                <ClubCard
                  key={id}
                  id={id}
                  club={club}
                  currentClubs={currentClubs}
                  user={currentUser}
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
