import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import {
  Formik,
  Field,
  Form as FormikForm,
  ErrorMessage as FormikError,
} from "formik";
import * as Yup from "yup";
import brandLogo from "../../assets/Logo_f.png";
import { useTranslation } from "react-i18next";
import { useLogin } from "../../hooks/useAuth";
import ErrorMessage from "../error-message/ErrorMessage";

export default function LogIn() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const login = useLogin();
  const [error, setError] = useState("");

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("userForm.invalidEmail"))
      .required(t("userForm.requiredEmail")),
    password: Yup.string()
      .min(6, t("userForm.minLengthPassword"))
      .required(t("userForm.requiredPassword")),
  });

  const handleSubmit = async (values) => {
    try {
      await login(values.email, values.password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const clearError = () => {
    setError("");
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

              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, handleChange, isSubmitting }) => (
                  <FormikForm>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="email" className="form-label">
                        {t("userForm.email")}
                      </Form.Label>
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        placeholder="name@example.com"
                        className="form-control"
                        value={values.email}
                        onChange={handleChange}
                      />
                      <FormikError
                        name="email"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="password" className="form-label">
                        {t("userForm.password")}
                      </Form.Label>
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        placeholder="*******"
                        className="form-control"
                        value={values.password}
                        onChange={handleChange}
                      />
                      <FormikError
                        name="password"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                    <Form.Group className="text-center my-4">
                      <Button
                        type="submit"
                        className="btn btn-dark px-5"
                        disabled={isSubmitting}
                      >
                        {t("login")}
                      </Button>
                    </Form.Group>
                  </FormikForm>
                )}
              </Formik>
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
              {error && (
                <ErrorMessage message={error} clearError={clearError} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
