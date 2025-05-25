import { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';

const CreateTable = () => {
    const [tableName, setTableName] = useState('');
    const [columns, setColumns] = useState([{ name: '', type: '' }]);
    const navigate = useNavigate();

    const dataTypes = ['char', 'varchar', 'text', 'boolean', 'numeric', 'integer', 'bigint', 'float', 'date', 'time', 'timestamp'];

    const handleAddColumn = () => {
        setColumns([...columns, { name: '', type: '' }]);
    };

    const handleInputChange = (index, event) => {
        const newColumns = [...columns];
        newColumns[index][event.target.name] = event.target.value;
        setColumns(newColumns);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/create-table/', {
                table_name: tableName,
                columns: columns
            });
            alert(response.data.message);
            navigate('/'); // Redirect to dashboard after success
        } catch (error) {
            alert(error.response.data.error);
        }
    };

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Create a New Table</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Table Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={tableName}
                                        onChange={(e) => setTableName(e.target.value)}
                                        required
                                        placeholder="Enter table name"
                                    />
                                </Form.Group>
                                <h5>Columns:</h5>
                                {columns.map((col, index) => (
                                    <Row key={index} className="mb-2">
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                placeholder="Column Name"
                                                value={col.name}
                                                onChange={(e) => handleInputChange(index, e)}
                                                required
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Select
                                                name="type"
                                                value={col.type}
                                                onChange={(e) => handleInputChange(index, e)}
                                                required
                                            >
                                                <option value="">Select Data Type</option>
                                                {dataTypes.map((dt) => (
                                                    <option key={dt} value={dt}>{dt}</option>
                                                ))}
                                            </Form.Select>
                                        </Col>
                                        <Col xs="auto">
                                            {columns.length > 1 && index !== 0 && (
                                                <Button
                                                    variant="danger"
                                                    type="button"
                                                    onClick={() => {
                                                        const newColumns = columns.filter((_, i) => i !== index);
                                                        setColumns(newColumns);
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            )}
                                        </Col>
                                    </Row>
                                ))}
                                <Button variant="secondary" type="button" onClick={handleAddColumn} className="me-2">
                                    Add Column
                                </Button>
                                <Button variant="primary" type="submit">
                                    Create Table
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateTable;
