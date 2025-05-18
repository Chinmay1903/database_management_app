import { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col, Table } from 'react-bootstrap';
import axios from '../api/api';

function SQLQuery() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleExecute = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    try {
        const response = await axios.post('/execute/', { query });
        setResult(response.data);
    } catch (err) {
        setError(err.response.data.message || 'An error occurred while executing the query.');
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h3>SQL Query Executor</h3>
          <Form onSubmit={handleExecute}>
            <Form.Group>
              <Form.Label>SQL Query</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter your SQL query here"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Execute
            </Button>
          </Form>

          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          
          {result && result.data && (
            <div className="mt-4">
              <h5>Query Result:</h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    {Object.keys(result.data[0]).map((col) => (
                      <th key={col}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.data.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value, i) => (
                        <td key={i}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}

          {result && result.message && (
            <Alert variant="success" className="mt-3">{result.message}</Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default SQLQuery;
