import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { IoCloseOutline } from "react-icons/io5";

export default function ErrorMessage({ message, clearError }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    !message ? setShow(false) : setShow(true);
  }, [message]);

  const handleClose = () => {
    setShow(false);
    clearError();
  };

  return (
    <Alert show={show} variant="danger" className="my-2">
      <div className="d-flex justify-content-between">
        <p className="my-auto">{message}</p>
        <Button onClick={handleClose} variant="outline-danger">
          <IoCloseOutline />
        </Button>
      </div>
    </Alert>
  );
}
