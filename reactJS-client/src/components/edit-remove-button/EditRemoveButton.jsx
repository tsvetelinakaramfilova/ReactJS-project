import { MdOutlineEditNote, MdOutlineBookmarkRemove } from "react-icons/md";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

export default function EditRemoveButton({
  editTo,
  deleteToSucces
}) {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const routeChange = (deleteToSucces) => {
    navigate(deleteToSucces);
  };

  return (
    <div>
      <Link
        to={editTo}
        className="text-dark btn-outline-secondary"
      >
        <MdOutlineEditNote className="me-5" />
      </Link>
      <Link
        to={""}
        onClick={handleShow}
        className="text-dark btn-outline-secondary"
      >
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
          {/* navigate(deleteToSucces) */}
          <Button className="btn btn-dark" onClick={""}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
