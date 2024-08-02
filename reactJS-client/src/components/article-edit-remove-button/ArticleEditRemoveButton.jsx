import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetAllComments, useRemoveComment } from "../../hooks/useComments";
import { useRemoveArticle } from "../../hooks/useArticles";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdOutlineEditNote, MdOutlineBookmarkRemove } from "react-icons/md";
import ErrorMessage from "../error-message/ErrorMessage";

export default function ArticleEditRemoveButton({ editLink, deleteIdItem }) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState();

  const [comments] = useGetAllComments(deleteIdItem);
  const deleteComment = useRemoveComment();
  const deleteArticle = useRemoveArticle();

  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onClickDelete = async () => {
    try {
      if (comments.length > 0) {
        await comments.map(async (comment) => {
          await deleteComment(comment._id);
        });
      }
      await deleteArticle(deleteIdItem);
      navigate("/articles")
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
