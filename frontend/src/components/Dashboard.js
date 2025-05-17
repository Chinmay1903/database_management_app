import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import RecordList from './RecordList';
import RecordForm from './RecordForm';

function Dashboard() {
  return (
    <Container className="mt-3">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>pgAdminLite</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Dashboard</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <h3 className="mt-3">Database Dashboard</h3>
      <RecordForm />
      <RecordList />
    </Container>
  );
}

export default Dashboard;