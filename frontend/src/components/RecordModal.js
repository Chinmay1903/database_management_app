import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function RecordModal({ show, handleClose, handleSave, recordData }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Set initial values when editing
  useEffect(() => {
    if (recordData) {
      setName(recordData.name);
      setDescription(recordData.description);
    } else {
      setName('');
      setDescription('');
    }
  }, [recordData]);

  const handleSubmit = () => {
    handleSave({ name, description });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{recordData ? 'Edit Record' : 'Add Record'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {recordData ? 'Update' : 'Add'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RecordModal;
