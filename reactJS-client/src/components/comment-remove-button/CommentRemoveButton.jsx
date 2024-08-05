import { MdOutlineBookmarkRemove } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ErrorMessage from "../error-message/ErrorMessage";

export default function CommentRemoveButton({ idDeleteComment, deleteMethod }) {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [error, setError] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onClickDelete = async () => {
    try {
      await deleteMethod(idDeleteComment);
    } catch (err) {
      setError(err.message);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <div>
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
          <Modal.Title>{t("comments.deleteComment")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t("deleteForm.areYouSure")}</Modal.Body>
        <Modal.Footer>
          <Button
            className="btn bg-transparent text-dark btn-outline-dark"
            onClick={handleClose}
          >
            {t("deleteForm.cancel")}
          </Button>
          <Button className="btn btn-dark" onClick={onClickDelete}>
            {t("deleteForm.delete")}
          </Button>
        </Modal.Footer>
        {error && <ErrorMessage message={error} clearError={clearError} />}
      </Modal>
    </div>
  );
}
