import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

function AppNavbar({ isAuthenticated, onLogout }) {
  const location = useLocation();
  console.log(location, location.pathname);

  // Function to check if the current path matches the link
  const isActive = (path) => location.pathname === path;

  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top" className="shadow">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          pgAdminLite
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated && (
              <>
                <Nav.Link
                  as={Link}
                  to="/"
                  className={`nav-item ${isActive('/') ? 'active-link' : ''}`}
                >
                  Dashboard
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/createtable"
                  className={`nav-item ${isActive('/createtable') ? 'active-link' : ''}`}
                >
                  Create Table
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/sqlquery"
                  className={`nav-item ${isActive('/sqlquery') ? 'active-link' : ''}`}
                >
                  SQL Query
                </Nav.Link>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Nav.Link
                  as={Link}
                  to="/"
                  className={`nav-item ${isActive('/') ? 'active-link' : ''}`}
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/register"
                  className={`nav-item ${isActive('/register') ? 'active-link' : ''}`}
                >
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
          {isAuthenticated && (
            <Button variant="outline-light" onClick={onLogout} className="ms-2">
              <FaSignOutAlt /> Logout
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
