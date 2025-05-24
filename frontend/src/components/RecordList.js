import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Table, ButtonGroup, Button, Container, Row, Col } from 'react-bootstrap';
import api from '../api/api';
import DynamicModalForm from './DynamicModalForm'; // Adjust the import based on your project structure
import { useNavigate } from 'react-router-dom';

const RecordList = forwardRef(({ tableName, refresh }, ref) => {
  const [rows, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const navigate = useNavigate();

  useImperativeHandle(ref, () => ({
    fetchRecords,
  }));

  useEffect(() => {
    if (tableName) {
      fetchRecords();
    }
  }, [tableName]);


  const fetchRecords = async () => {
    try {
      const response = await api.get(`/table/${tableName}`);
      setRecords(response.data);
    } catch (err) {
      console.error('Failed to fetch records');
    }
  };

  const handleAdd = () => {
    setSelectedRecord(null);  // Clear previous data
    setShowModal(true);       // Show modal for adding
    setModalMode('add');      // Set mode to 'add'
  };

  const handleEdit = (row) => {
    setSelectedRecord(row);  // Pre-fill with existing data
    setShowModal(true);         // Show modal for editing
    setModalMode('edit');      // Set mode to 'edit'
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/table/${tableName}/${id}/`);
      fetchRecords();
    } catch (err) {
      console.error('Delete failed');
    }
  };

  const handleDrop = async () => {
        if (window.confirm(`Are you sure you want to DROP table '${tableName}'? This cannot be undone.`)) {
            try {
                await api.delete(`/table/drop/${tableName}/`);
                alert(`Table '${tableName}' dropped.`);
                refresh();
            } catch (err) {
                alert("Error dropping table: " + (err.response?.data?.error || err.message));
            }
        }
    };

    const handleTruncate = async () => {
        if (window.confirm(`Are you sure you want to TRUNCATE table '${tableName}'? This will delete all rows.`)) {
            try {
                await api.post(`/table/truncate/${tableName}/`);
                alert(`Table '${tableName}' truncated.`);
                fetchRecords(); // Reload data
            } catch (err) {
                alert("Error truncating table: " + (err.response?.data?.error || err.message));
            }
        }
    };

  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];

  return (
    <Container className="mt-3">
      <Row>
        <Col>
          <ButtonGroup>
            <Button variant="primary" className="mb-3" onClick={handleAdd}>Add Row</Button>
            <Button variant="warning" className="mb-3" onClick={handleTruncate}>Truncate Table</Button>
            <Button variant="danger" className="mb-3" onClick={handleDrop}>Drop Table</Button>
          </ButtonGroup>
          
          <Table striped bordered hover>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id || row[columns[0]]}>
                  {columns.map((col) => (
                    <td key={col}>{row[col]}</td>
                  ))}
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(row)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(row.id)}
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
      <DynamicModalForm
        show={showModal}
        onClose={() => setShowModal(false)}
        tableName={tableName}
        mode={modalMode} // Pass the mode to the modal
        onSubmitSuccess={() => {
          fetchRecords();
          console.log('Row added/updated');
        }} 
        rowData={selectedRecord} // Pass selected record data for editing
        rowId={selectedRecord ? selectedRecord.id : null} // Pass ID for editing
      />
    </Container>
  );
});

export default RecordList;
