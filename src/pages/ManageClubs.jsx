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

        <div className="pageTitle">
          <h1>Manage Clubs</h1>
        </div>
        <div className="org-title">
          <Link to="/" relative="path">
            <Button variant="outline-secondary">Back to feed</Button>
          </Link>
          <Button href="/newclub" variant="outline-primary">
            Add New Club
          </Button>{" "}
        </div>
        <Row>
          <Col>
            {allAdminClubs.length !== 0 ? allAdminClubs.map(([id, clubData]) => {
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
            }            
            ): <Container className="text-center">Clubs that you are an admin for will appear here. Add a new club to get started.</Container>
          }
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ManageClubs;
