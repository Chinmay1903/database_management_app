import { useState } from 'react';
import { Container, Navbar, Nav, Button, Offcanvas } from 'react-bootstrap';
import RecordList from './RecordList';

function Dashboard({ onLogout }) {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleClose = () => setShowSidebar(false);
  const handleShow = () => setShowSidebar(true);

  return (
    <Container fluid className="mt-3">
      {/* Main Content */}
      <div style={{ marginLeft: showSidebar ? 390 : 80, transition: 'margin-left 0.3s' }}>
        <h3 className="mt-3">Database Dashboard</h3>
        <div className="mx-3">
          <RecordList />
        </div>
      </div>
    </Container>
  );
}

export default Dashboard;