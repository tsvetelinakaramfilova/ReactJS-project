import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import brandLogo from "../../assets/Logo_f.png";
import { useForm } from "../../hooks/useForm";
import UserContext from "../../contexts/UserContext";
import { useLogin } from "../../hooks/useAuth";
import ErrorMessage from "../error-message/ErrorMessage";

export default function LogIn() {
  const navigate = useNavigate();
  const login = useLogin();
  const [error, setError] = useState(null);

  const initialValues = {
    email: "",
    password: "",
  };

  const loginSubmitHandler = async ({ email, password }) => {
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const { changeHandler, submitHandler, values } = useForm(
    initialValues,
    loginSubmitHandler
  );

  const clearError = () => {
    setError(null);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
          <div className="card border border-light-subtle rounded-3 shadow bg-gradient">
            <div className="card-body p-3 p-md-4 p-xl-5">
              <div className="text-center mb-5">
                <img
                  src={brandLogo}
                  alt="BootstrapBrain Logo"
                  width="25%"
                  height="25%"
                />
              </div>

              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="email" className="form-label">
                    Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    className="form-control"
                    value={values.email}
                    name="email"
                    id="email"
                    placeholder="name@example.com"
                    onChange={changeHandler}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="password" className="form-label">
                    Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    className="form-control"
                    value={values.password}
                    name="password"
                    id="password"
                    placeholder="*******"
                    onChange={changeHandler}
                    required
                  />
                </Form.Group>
                <Form.Group className="text-center my-4">
                  <Button type="submit" className="btn btn-dark px-5">
                    Log In
                  </Button>
                </Form.Group>
              </Form>
              <div className="col-12">
                <p className="m-0 text-secondary text-center">
                  Go to{" "}
                  <Link
                    to="/registration"
                    className="link-dark text-decoration-none"
                  >
                    Registration
                  </Link>
                </p>
              </div>
              {error && <ErrorMessage message={error} clearError={clearError} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
