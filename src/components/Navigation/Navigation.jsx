import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from 'react-router-dom';
import "../../styles/navigation.css"
import { signOut } from "../../utilities/firebase";

const SignOutButton = () => {
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/`; 
    navigate(path);
  }
  return (
    <button className="ms-auto btn btn-dark" onClick={() => {
      signOut(); 
      routeChange();
      }}>
      Sign out
    </button>
);}

const Navigation = ({ currentUserData }) => {
  return (
    <Navbar className="navBar" bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">ClubBulletin</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Feed</Nav.Link>
            <Nav.Link href="/organizations">Subscribe</Nav.Link>
            <Nav.Link href="/manageclubs">Manage</Nav.Link>
            <NavDropdown title={currentUserData.name} id="basic-nav-dropdown">
              {/* <NavDropdown.Divider /> */}
              <NavDropdown.Item href="#action/3.4">
                <SignOutButton></SignOutButton>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
