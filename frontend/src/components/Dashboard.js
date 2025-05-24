import { useState, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import RecordList from './RecordList';
import Sidebar from './Sidebar';

function Dashboard() {
  const [selectedTable, setSelectedTable] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const recordListRef = useRef();

  const handleTableSelect = (table) => {
    setSelectedTable(table);
    // Reset the RecordList component when a new table is selected
    setTimeout(() => {
      recordListRef.current?.fetchRecords();
    }, 0);
  };

  const reset = () => {
    setTrigger(!trigger); // Toggle the trigger to force re-render
    setSelectedTable(null); // Refresh records
  }

  return (
    <Container fluid>
      <Row>
        <Col md={3} className="p-0">
          <Sidebar onSelectTable={handleTableSelect} runEffect={trigger} />
        </Col>
        <Col md={9} className="p-4">
          <h2>Dashboard</h2>
          {selectedTable ? (
            <>
            <p>Selected Table: {selectedTable}</p>
            <div className="mx-3">
              <RecordList ref={recordListRef} tableName={selectedTable} refresh={reset} />
            </div>
            </>
          ) : (
            <p>Select a table from the list</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
