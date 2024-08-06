import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import brandLogo from "../../assets/Logo_f.png";
import { useForm } from "../../hooks/useForm";
import { useLogin } from "../../hooks/useAuth";
import ErrorMessage from "../error-message/ErrorMessage";
import { useTranslation } from "react-i18next";

export default function LogIn() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const login = useLogin();
  const [error, setError] = useState({});

  const initialValues = {
    email: "",
    password: "",
  };

  const validationLogin = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = t("userForm.requiredEmail");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = t("userForm.invalidEmail");
    }
    if (!values.password) {
      errors.password = t("userForm.requiredPassword");
    } else if (values.password.length < 5) {
      errors.password = t("userForm.minLengthPassword");
    }
    return errors;
  };

  const loginSubmitHandler = async ({ email, password }) => {
    const errors = validationLogin({ email, password });
    if (Object.keys(errors).length) {
      setError(errors);
      return;
    }

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError({ server: err.message });
    }
  };

  const { changeHandler, submitHandler, values } = useForm(
    initialValues,
    loginSubmitHandler
  );

  const clearError = () => {
    setError({});
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
                    {t("userForm.email")}
                  </Form.Label>
                  <Form.Control
                    type="email"
                    className="form-control"
                    value={values.email}
                    name="email"
                    id="email"
                    placeholder="name@example.com"
                    onChange={changeHandler}
                    // required
                  />
                  {error.email && (
                    <div className="text-danger">{error.email}</div>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="password" className="form-label">
                    {t("userForm.password")}
                  </Form.Label>
                  <Form.Control
                    type="password"
                    className="form-control"
                    value={values.password}
                    name="password"
                    id="password"
                    placeholder="*******"
                    onChange={changeHandler}
                    // required
                  />
                  {error.password && (
                    <div className="text-danger">{error.password}</div>
                  )}
                </Form.Group>
                <Form.Group className="text-center my-4">
                  <Button type="submit" className="btn btn-dark px-5">
                    {t("login")}
                  </Button>
                </Form.Group>
              </Form>
              <div className="col-12">
                <p className="m-0 text-secondary text-center">
                  {t("userForm.goTo")}{" "}
                  <Link
                    to="/registration"
                    className="link-dark text-decoration-none"
                  >
                    {t("registration")}
                  </Link>
                </p>
              </div>
              {error.server && (
                <ErrorMessage message={error.server} clearError={clearError} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
