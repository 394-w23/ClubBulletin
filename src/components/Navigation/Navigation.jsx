import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../utilities/firebase";
import "./Navigation.css";
import "../../styles/navigation.css"

const SignOutButton = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/`;
    navigate(path);
  };
  return (
    <button
      className="ms-auto btn btn-dark"
      onClick={() => {
        signOut();
        routeChange();
      }}
    >
      Sign out
    </button>
  );
};

const Navigation = ({ currentUserData, currentLabel }) => {
  const pages = [
    { route: "/", label: "Feed" },
    { route: "/manageclubs", label: "Manage" },
  ];

  return (
    <Navbar className="navBar" id="navigationBar" bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/" className="nav-title">
          ClubBulletin
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {pages.map((page) => {
              return (
                <Nav.Link
                  key={page.label}
                  href={currentLabel === page.label ? null : page.route}
                  className={
                    currentLabel === page.label
                      ? "current-nav-label"
                      : "faded-nav-label"
                  }
                  data-cy={page.label}
                >
                  {page.label}
                </Nav.Link>
              );
            })}
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
