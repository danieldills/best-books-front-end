import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class BookFormModal extends React.Component {
  render() {
    return (
      <>
        <Button onClick={this.props.showModal}>Add Books</Button>
        <Modal show={this.props.displayModal} onHide={this.props.hideModal}>
          <Form>
            <Form.Group controlId="formGroupName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter book name" onInput={this.props.handleNameI} />
            </Form.Group>
            <Form.Group controlId="formGroupAuthor">
              <Form.Label>Author</Form.Label>
              <Form.Control type="text" placeholder="Enter author" onInput={this.props.handleAuthorI} />
            </Form.Group>
            <Form.Group controlId="formGroupDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Enter description" onInput={this.props.handleDescriptionI} />
            </Form.Group>
            <Form.Group controlId="formGroupStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control type="text" placeholder="Read or unread" onInput={this.props.handleStatusI} />
            </Form.Group>
            <Button onClick={this.props.hideModal}>Close</Button>
            <Button onClick={this.props.addInfo}>Save Changes</Button>
          </Form>
        </Modal>
      </>
    )
  }
}

export default BookFormModal;