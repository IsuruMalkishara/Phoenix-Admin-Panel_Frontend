import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AddPopup = ({ add, closePopup, name }) => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');

  const handleAdd = () => {
    add(id, title);
  };

  return (
    <div style={{ backgroundColor: 'rgb(3, 122, 126)' }}>
      <Modal show={true} onHide={closePopup}>
        <Modal.Header closeButton style={{ textAlign: 'center' }}>
          <Modal.Title style={{ textAlign: 'center' }}>Add {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
          <div className='row' style={{ marginTop: '10px' }}>
            <div className='col'>
              <Form.Label>ID</Form.Label>
            </div>
            <div className='col'>
              <Form.Control
                className='input'
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
          </div>
          <div className='row' style={{ marginTop: '10px' }}>
            <div className='col'>
              <Form.Label>Title</Form.Label>
            </div>
            <div className='col'>
              <Form.Control
                className='input'
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ textAlign: 'center' }}>
          <Button variant="secondary" onClick={closePopup}>
            Cancel
          </Button>
          <Button onClick={handleAdd}>Add</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddPopup;
