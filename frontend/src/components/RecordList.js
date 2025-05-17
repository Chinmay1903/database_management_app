import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import api from '../api/api';

function RecordList() {
  const [records, setRecords] = useState([]);

  const fetchRecords = async () => {
    try {
      const response = await api.get('/records/');
      setRecords(response.data);
    } catch (err) {
      console.log('Failed to fetch records');
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const deleteRecord = async (id) => {
    try {
      await api.delete(`/records/${id}/`);
      fetchRecords();
    } catch (err) {
      console.log('Delete failed');
    }
  };

  return (
    <Table striped bordered hover className="mt-3">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {records.map(record => (
          <tr key={record.id}>
            <td>{record.name}</td>
            <td>{record.description}</td>
            <td>
              <Button variant="danger" onClick={() => deleteRecord(record.id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default RecordList;