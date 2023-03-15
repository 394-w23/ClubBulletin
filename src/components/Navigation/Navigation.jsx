import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../utilities/firebase";
// import "./navigation.css";
// import "../../styles/navigation.css";

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
      data-testid="sign-out-button"
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
        <Navbar.Toggle data-testid="navbar-toggle"aria-controls="basic-navbar-nav" />
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
            <NavDropdown  title={currentUserData.name} data-testid="signout-dropdown" id="basic-nav-dropdown">
              {/* <NavDropdown.Divider /> */}
              <NavDropdown.Item data-testid="signout-dropdown-inner" href="#action/3.4">
                <SignOutButton data-testid='signout-button-outer'></SignOutButton>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
