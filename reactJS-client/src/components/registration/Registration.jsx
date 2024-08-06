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
import { useRegister } from "../../hooks/useAuth";
import ErrorMessage from "../error-message/ErrorMessage";
import { useTranslation } from "react-i18next";

export default function Registration() {
  const register = useRegister();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("userForm.invalidEmail"))
      .required(t("userForm.requiredEmail")),
    password: Yup.string()
      .min(5, t("userForm.minLengthPassword"))
      .required(t("userForm.requiredPassword")),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], t("userForm.mustMatchPassword"))
      .required(t("userForm.requiredRePassword")),
  });

  const handleSubmit = async (values) => {
    try {
      await register(values.email, values.password);
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
                initialValues={{ email: "", password: "", rePassword: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, handleChange }) => (
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
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="rePassword" className="form-label">
                        {t("userForm.rePassword")}
                      </Form.Label>
                      <Field
                        type="password"
                        name="rePassword"
                        id="rePassword"
                        placeholder="*******"
                        className="form-control"
                        value={values.rePassword}
                        onChange={handleChange}
                      />
                      <FormikError
                        name="rePassword"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                    <Form.Group className="text-center my-4">
                      <Button type="submit" className="btn btn-dark px-5">
                        {t("registration")}
                      </Button>
                    </Form.Group>
                  </FormikForm>
                )}
              </Formik>
              <div className="col-12">
                <p className="m-0 text-secondary text-center">
                  {t("userForm.haveAnAccount")}{" "}
                  <Link to="/login" className="link-dark text-decoration-none">
                    {t("login")}
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
