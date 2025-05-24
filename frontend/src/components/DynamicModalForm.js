import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import api from '../api/api';

const DynamicForm = ({ show, onClose, tableName, mode = 'add', rowId = null, rowData = null, onSubmitSuccess }) => {
    const [columns, setColumns] = useState([]);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (tableName) {
            api.get(`table-columns/${tableName}/`)
                .then(res => {
                    const cols = res.data.columns || [];
                    setColumns(cols);
                    const initData = {};
                    cols.forEach(col => {
                        initData[col] = rowData?.[col] || '';
                    });
                    setFormData(initData);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [show, tableName, rowData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = mode === 'edit'
            ? `table/${tableName}/${rowId}/`
            : `table/${tableName}/`;

        const method = mode === 'edit' ? 'put' : 'post';

        try {
            await api[method](url, formData);
            alert(`${mode === 'edit' ? 'Updated' : 'Added'} successfully`);
            onSubmitSuccess();
            onClose();
        } catch (err) {
            alert("Error: " + err.response?.data?.error || err.message);
        }
    };

    return (
        <Modal show={show} onHide={onClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{mode === 'edit' ? 'Update Row' : 'Add New Row'} - {tableName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? (
                    <div className="text-center"><Spinner animation="border" /></div>
                ) : (
                    <Form onSubmit={handleSubmit}>
                        {columns.map((col, i) => (
                            <Form.Group key={i} className="mb-3">
                                <Form.Label>{col}</Form.Label>
                                <Form.Control
                                    type="text"
                                    name={col}
                                    value={formData[col] || ''}
                                    onChange={handleChange}
                                    disabled={col === 'id' && mode === 'edit'}
                                />
                            </Form.Group>
                        ))}
                        <div className="d-flex justify-content-end">
                            <Button variant="secondary" onClick={onClose} className="me-2">Cancel</Button>
                            <Button variant="primary" type="submit">
                                {mode === 'edit' ? 'Update' : 'Add'}
                            </Button>
                        </div>
                    </Form>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default DynamicForm;
