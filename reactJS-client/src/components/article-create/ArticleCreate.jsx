import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from "react-icons/io";
import { MdBackspace } from "react-icons/md";
import { useForm } from "../../hooks/useForm";
import { useCreateArticle } from "../../hooks/useArticles";
import ErrorMessage from "../error-message/ErrorMessage";

export default function ArticleCreate() {
  const navigate = useNavigate();
  const createArticle = useCreateArticle();
  const [error, setError] = useState();

  const initialValues = {
    name: "",
    tags: [""],
    timeRead: "",
    description: "",
    images: [""],
  };

  const createArticleSubmitHandler = async (values) => {
    try {
      const { _id: articleId } = await createArticle(values);

      navigate(`/articles/details/${articleId}`);
    } catch (err) {
      setError(err.message);
    }
  };

  const {
    values,
    changeHandler,
    arrayChangeHandler,
    addArrayItem,
    removeArrayItem,
    submitHandler,
  } = useForm(initialValues, createArticleSubmitHandler);

  const clearError = () => {
    setError(null);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm p-3 mb-5 bg-body rounded">
            <div className="card-body">
              <div className="text-end icon mb-3 me-2">
                <MdBackspace
                  className="custom-icon"
                  onClick={() => navigate("/articles")}
                />
              </div>
              <Form onSubmit={submitHandler}>
                <div className="form-group my-3">
                  <label htmlFor="name">Title</label>
                  <Form.Control
                    name="name"
                    type="text"
                    className="form-control custom-form-control"
                    value={values.name}
                    onChange={changeHandler}
                  />
                </div>

                <div className="form-group my-3">
                  <div className="d-flex justify-content-between">
                    <label htmlFor="tags">Tags</label>
                    <Button
                      className="b-add text-white btn btn-success me-1"
                      onClick={() => addArrayItem("tags")}
                    >
                      <IoMdAddCircleOutline />
                    </Button>
                  </div>
                  {values.tags.map((tag, index) => (
                    <div key={index} className="form-group my-2">
                      <InputGroup className="mb-3">
                        <Form.Control
                          type="text"
                          value={tag}
                          onChange={(e) =>
                            arrayChangeHandler(index, "tags", e.target.value)
                          }
                          className="form-control"
                        />
                        <Button
                          className="btn-danger"
                          onClick={() => removeArrayItem(index, "tags")}
                        >
                          <IoMdRemoveCircleOutline className="me-1" />
                        </Button>
                      </InputGroup>
                    </div>
                  ))}
                </div>

                <div className="form-group my-3">
                  <label htmlFor="timeRead">Time read</label>
                  <Form.Control
                    name="timeRead"
                    type="number"
                    className="form-control custom-form-control"
                    value={values.timeRead}
                    onChange={changeHandler}
                  />
                </div>

                <div className="form-group my-3">
                  <label htmlFor="description">Description</label>
                  <Form.Control
                    name="description"
                    as="textarea"
                    rows={3}
                    className="form-control custom-form-control"
                    value={values.description}
                    onChange={changeHandler}
                  />
                </div>

                <div className="form-group my-3">
                  <div className="d-flex justify-content-between">
                    <label htmlFor="images">Images</label>
                    <Button
                      className="b-add text-white btn btn-success me-1"
                      onClick={() => addArrayItem("images")}
                    >
                      <IoMdAddCircleOutline />
                    </Button>
                  </div>
                  {values.images.map((image, index) => (
                    <div key={index} className="form-group my-2">
                      <InputGroup className="mb-3">
                        <Form.Control
                          type="text"
                          value={image}
                          onChange={(e) =>
                            arrayChangeHandler(index, "images", e.target.value)
                          }
                          className="form-control"
                        />
                        <Button
                          className="btn-danger"
                          onClick={() => removeArrayItem(index, "images")}
                        >
                          <IoMdRemoveCircleOutline className="me-1" />
                        </Button>
                      </InputGroup>
                    </div>
                  ))}
                </div>

                <div className="d-grid gap-2 justify-content-center">
                  <Button
                    className="mt-3 text-white"
                    type="submit"
                    variant="dark"
                  >
                    Add article
                  </Button>
                </div>
              </Form>
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
