import { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import axios from '../api/api';
import { Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/register/', {
        username,
        email,
        password,
      });
      setMessage('Registration successful! You can log in now.');
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setMessage('Registration failed. Please try again.');
      console.error(err.response?.data || 'Error');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={4}>
          <h3>Register</h3>
          {message && <Alert variant="info">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Register
            </Button>
          </Form>
          <div className="mt-3">
            Already have an account? <Link to="/">Login here</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
