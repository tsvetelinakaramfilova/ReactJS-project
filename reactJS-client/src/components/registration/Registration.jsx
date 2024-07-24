import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import brandLogo from "../../assets/Logo_f.png";
import UserContext from "../../contexts/UserContext";
import { useForm } from "../../hooks/useForm";

export default function Registration() {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rePassword: "",
  };

  const { register } = useContext(UserContext);
  const navigate = useNavigate();

  const registerSubmitHandler = ({ email, password }) => {
    register(firstName, lastName, email, password, rePassword);
    navigate("/");
  };

  const { changeHandler, submitHandler, values } = useForm(
    initialValues,
    registerSubmitHandler
  );

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
          {/* shadow-sm */}
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
                  <Form.Label htmlFor="firstName" className="form-label">
                    First Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    value={values.firstName}
                    name="firstName"
                    id="firstName"
                    placeholder="Alina"
                    onChange={changeHandler}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="lastName" className="form-label">
                    Last Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    value={values.lastName}
                    name="lastName"
                    id="lastName"
                    placeholder="Ivanova"
                    onChange={changeHandler}
                    required
                  />
                </Form.Group>
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
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="rePassword" className="form-label">
                    Repeat Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    className="form-control"
                    value={values.rePassword}
                    name="rePassword"
                    id="rePassword"
                    placeholder="*******"
                    onChange={changeHandler}
                    required
                  />
                </Form.Group>
                <Form.Group className="text-center my-4">
                  <Button type="submit" className="btn btn-dark px-5">
                    Registration
                  </Button>
                </Form.Group>
              </Form>
              <div className="col-12">
                <p className="m-0 text-secondary text-center">
                  Have an account?{" "}
                  <Link to="/login" className="link-dark text-decoration-none">
                    Log In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
