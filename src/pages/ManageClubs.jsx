import AdminCard from "../components/AdminCard/AdminCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Navigation from "../components/Navigation/Navigation";

const ManageClubs = ({ user, data }) => {
  const currentUserId = user.uid;
  const currentUserData = data.users[currentUserId];
  const currentClubsIds = Object.values(currentUserData.clubs);

  const allClubs = Object.entries(data.clubs);

  const allAdminClubs = allClubs.filter(([id, value]) =>
    value.admins.includes(currentUserId)
  );

  return (
    <div>
      <Container>
        <Navigation currentUserData={currentUserData} />
        <div className="org-title">
          <h1>Organizations list</h1>
          <Button href="/newclub" variant="outline-primary">
            Add New Club
          </Button>{" "}
        </div>
        <Link to="/" relative="path">
          <Button varient="primary">Back</Button>
        </Link>
        <Row>
          <Col>
            {allAdminClubs.map(([id, clubData]) => {
              return (
                <AdminCard
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

export default ManageClubs;
