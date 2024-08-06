import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Formik,
  Form as FormikForm,
  FieldArray,
  ErrorMessage as FormikError,
} from "formik";
import * as Yup from "yup";
import { Button, Form, InputGroup } from "react-bootstrap";
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from "react-icons/io";
import { MdBackspace } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useEditArticle, useGetOneArticle } from "../../hooks/useArticles";
import ErrorMessage from "../error-message/ErrorMessage";
import Loader from "../loader/Loader";

export default function ArticleEdit() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { articleId } = useParams();
  const { article, isFetching } = useGetOneArticle(articleId);
  const editArticle = useEditArticle();
  const [error, setError] = useState("");

  const initialValues = {
    name: article?.name || "",
    tags: article?.tags || [""],
    timeRead: article?.timeRead || "",
    description: article?.description || "",
    images: article?.images || [""],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required(t("articleForm.requiredTitle"))
      .min(3, t("articleForm.minLengthTitle")),
    tags: Yup.array()
      .of(Yup.string().required(t("articleForm.requiredTag")))
      .test(
        "minTags",
        t("articleForm.requiredOneTag"),
        (value) => value && value.length > 0
      ),
    timeRead: Yup.number()
      .required(t("articleForm.requiredTime"))
      .min(1, t("articleForm.positiveNumberTime")),
    description: Yup.string()
      .required(t("articleForm.requiredDescription"))
      .min(6, t("articleForm.minLengthDescription")),
    images: Yup.array()
      .of(Yup.string().required(t("articleForm.requiredImage")))
      .test(
        "minImages",
        t("articleForm.requiredOneImage"),
        (value) => value && value.length > 0
      ),
  });

  const editArticleSubmitHandler = async (values, { setSubmitting }) => {
    try {
      await editArticle(articleId, values);
      navigate(`/articles/details/${articleId}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const clearError = () => {
    setError("");
  };

  return isFetching ? (
    <Loader />
  ) : (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm p-3 mb-5 bg-body rounded">
            <div className="card-body">
              <div className="text-end icon mb-3 me-2">
                <MdBackspace
                  className="custom-icon"
                  onClick={() => navigate(-1)}
                />
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={editArticleSubmitHandler}
                enableReinitialize
              >
                {({ values, handleChange, handleSubmit, isSubmitting }) => (
                  <FormikForm onSubmit={handleSubmit}>
                    <div className="form-group my-3">
                      <label htmlFor="name">{t("articleForm.title")}</label>
                      <Form.Control
                        name="name"
                        type="text"
                        className="form-control custom-form-control"
                        value={values.name}
                        onChange={handleChange}
                      />
                      <FormikError
                        name="name"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <div className="form-group my-3">
                      <FieldArray name="tags">
                        {({ push, remove }) => (
                          <>
                            <div className="d-flex justify-content-between">
                              <label htmlFor="tags">
                                {t("articleForm.tags")}
                              </label>
                              <Button
                                type="button"
                                className="b-add text-white btn btn-success me-1"
                                onClick={() => push("")}
                              >
                                <IoMdAddCircleOutline />
                              </Button>
                            </div>
                            {values.tags.map((tag, index) => (
                              <div key={index} className="form-group my-2">
                                <InputGroup className="mb-3">
                                  <Form.Control
                                    type="text"
                                    name={`tags[${index}]`}
                                    value={tag}
                                    onChange={handleChange}
                                    className="form-control"
                                  />
                                  <Button
                                    type="button"
                                    className="btn-danger"
                                    onClick={() => remove(index)}
                                  >
                                    <IoMdRemoveCircleOutline className="me-1" />
                                  </Button>
                                </InputGroup>
                              </div>
                            ))}
                          </>
                        )}
                      </FieldArray>
                      <FormikError
                        name="tags"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <div className="form-group my-3">
                      <label htmlFor="timeRead">
                        {t("articleForm.timeRead")}
                      </label>
                      <Form.Control
                        name="timeRead"
                        type="number"
                        className="form-control custom-form-control"
                        value={values.timeRead}
                        onChange={handleChange}
                      />
                      <FormikError
                        name="timeRead"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <div className="form-group my-3">
                      <label htmlFor="description">
                        {t("articleForm.description")}
                      </label>
                      <Form.Control
                        name="description"
                        as="textarea"
                        rows={3}
                        className="form-control custom-form-control"
                        value={values.description}
                        onChange={handleChange}
                      />
                      <FormikError
                        name="description"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <div className="form-group my-3">
                      <FieldArray name="images">
                        {({ push, remove }) => (
                          <>
                            <div className="d-flex justify-content-between">
                              <label htmlFor="images">
                                {t("articleForm.images")}
                              </label>
                              <Button
                                type="button"
                                className="b-add text-white btn btn-success me-1"
                                onClick={() => push("")}
                              >
                                <IoMdAddCircleOutline />
                              </Button>
                            </div>
                            {values.images.map((image, index) => (
                              <div key={index} className="form-group my-2">
                                <InputGroup className="mb-3">
                                  <Form.Control
                                    type="text"
                                    name={`images[${index}]`}
                                    value={image}
                                    onChange={handleChange}
                                    className="form-control"
                                  />
                                  <Button
                                    type="button"
                                    className="btn-danger"
                                    onClick={() => remove(index)}
                                  >
                                    <IoMdRemoveCircleOutline className="me-1" />
                                  </Button>
                                </InputGroup>
                              </div>
                            ))}
                          </>
                        )}
                      </FieldArray>
                      <FormikError
                        name="images"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <div className="d-grid gap-2 justify-content-center">
                      <Button
                        className="mt-3 text-white"
                        type="submit"
                        variant="dark"
                        disabled={isSubmitting}
                      >
                        {t("articleForm.editArticle")}
                      </Button>
                    </div>
                  </FormikForm>
                )}
              </Formik>
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
