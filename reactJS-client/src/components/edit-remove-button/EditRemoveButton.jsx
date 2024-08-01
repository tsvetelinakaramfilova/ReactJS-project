import { MdOutlineEditNote, MdOutlineBookmarkRemove } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ErrorMessage from "../error-message/ErrorMessage";

export default function EditRemoveButton({
  idDeleteItem,
  editLink,
  deleteItem,
}) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onClickDelete = async () => {
    try {
      await deleteItem(idDeleteItem);
    } catch (err) {
      setError(err.message);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <div>
      <Link to={editLink} className="text-dark btn-outline-secondary">
        <MdOutlineEditNote className="me-5" />
      </Link>
      <Link onClick={handleShow} className="text-dark btn-outline-secondary">
        <MdOutlineBookmarkRemove />
      </Link>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure?</Modal.Body>
        <Modal.Footer>
          <Button
            className="btn bg-transparent text-dark btn-outline-dark"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button className="btn btn-dark" onClick={onClickDelete}>
            Delete
          </Button>
        </Modal.Footer>
        {error && <ErrorMessage message={error} clearError={clearError} />}
      </Modal>
    </div>
  );
}
