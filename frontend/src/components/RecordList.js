import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import api from '../api/api';
import RecordModal from './RecordModal';

function RecordList() {
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await api.get('/records/');
      setRecords(response.data);
    } catch (err) {
      console.error('Failed to fetch records');
    }
  };

  const handleAdd = () => {
    setSelectedRecord(null);  // Clear previous data
    setShowModal(true);       // Show modal for adding
  };

  const handleEdit = (record) => {
    setSelectedRecord(record);  // Pre-fill with existing data
    setShowModal(true);         // Show modal for editing
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/records/${id}/`);
      fetchRecords();
    } catch (err) {
      console.error('Delete failed');
    }
  };

  const handleSave = async (data) => {
    try {
      if (selectedRecord) {
        // Update existing record
        await api.put(`/records/${selectedRecord.id}/`, data);
      } else {
        // Add new record
        await api.post('/records/', data);
      }
      fetchRecords();
    } catch (err) {
      console.error('Save failed');
    }
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col>
          <h3>Records</h3>
          <Button variant="primary" className="mb-3" onClick={handleAdd}>
            Add Record
          </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id}>
                  <td>{record.id}</td>
                  <td>{record.name}</td>
                  <td>{record.description}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(record)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(record.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <RecordModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSave}
        recordData={selectedRecord}
      />
    </Container>
  );
}

export default RecordList;
