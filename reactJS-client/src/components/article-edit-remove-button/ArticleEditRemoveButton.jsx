import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useRemoveArticle } from "../../hooks/useArticles";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdOutlineEditNote, MdOutlineBookmarkRemove } from "react-icons/md";
import ErrorMessage from "../error-message/ErrorMessage";

export default function ArticleEditRemoveButton({ editLink, deleteIdItem }) {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const deleteArticle = useRemoveArticle();

  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onClickDelete = async () => {
    setLoading(true);
    try {
      await deleteArticle(deleteIdItem);
      navigate("/articles");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError("");
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
          <Modal.Title>{t("deleteForm.deleteItem")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t("deleteForm.areYouSure")}</Modal.Body>
        <Modal.Footer>
          <Button
            className="btn bg-transparent text-dark btn-outline-dark"
            onClick={handleClose}
          >
            {t("deleteForm.cancel")}
          </Button>
          <Button
            className="btn btn-dark"
            onClick={onClickDelete}
            disabled={loading}
          >
            {t("deleteForm.delete")}
          </Button>
        </Modal.Footer>
        {error && <ErrorMessage message={error} clearError={clearError} />}
      </Modal>
    </div>
  );
}
