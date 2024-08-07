import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  Formik,
  Form as FormikForm,
  Field,
  ErrorMessage as FormikError,
} from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import {
  useCreateComment,
  useGetAllComments,
  useRemoveComment,
} from "../../hooks/useComments";
import { useAuthContext } from "../../contexts/authContext";
import { Button, Form } from "react-bootstrap";
import styles from "./CommentSection.module.css";
import CommentRemoveButton from "../comment-remove-button/CommentRemoveButton";
import ErrorMessage from "../error-message/ErrorMessage";

export default function CommentSection() {
  const { t } = useTranslation();
  const { articleId } = useParams();
  const { userId, email, isAuthenticated } = useAuthContext();
  const [error, setError] = useState("");
  const [comments, setComments] = useGetAllComments(articleId);
  const createComment = useCreateComment();
  const deleteComment = useRemoveComment();

  const initialValues = {
    commentText: "",
  };

  const validationSchema = Yup.object().shape({
    commentText: Yup.string()
      .required("Comment text is required")
      .min(4, "Comment must be at least 4 characters long"),
  });

  const commentSubmitHandler = async (values, { setSubmitting, resetForm }) => {
    try {
      const newComment = await createComment(articleId, values.commentText);
      setComments((oldComments) => [
        ...oldComments,
        { ...newComment, author: { email } },
      ]);
      resetForm();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments((oldComments) =>
        oldComments.filter((comment) => comment._id !== commentId)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const clearError = () => {
    setError("");
  };

  return (
    <div className="my-4">
      <div>
        <h4 className="ms-1 fst-italic mb-3">
          {t("comments.comments")}
        </h4>
      </div>
      {comments.length === 0 ? (
        <div className="card my-3 py-2 px-3">
          <div className="d-flex justify-content-center">
            <h6 className="ms-1 my-2">{t("comments.notComment")}</h6>
          </div>
        </div>
      ) : (
        comments.map((comment) => (
          <div key={comment._id} className="card my-3 py-2 px-3 shadow-sm p-3 mb-4 bg-body rounded">
            <div className="flex-grow-1 d-flex align-items-center">
              <h5 className="card-title ms-1 mb-0">{comment.author.email}</h5>
              <div className="ms-auto text-end my-2 text-grey-600 star">
                {new Date(comment._createdOn).toLocaleDateString()}
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <p className="card-text my-1">{comment.commentText}</p>
              <div
                className={`${styles["itemSvg"]} text-end my-1 text-grey-600`}
              >
                {userId === comment._ownerId && (
                  <CommentRemoveButton
                    idDeleteComment={comment._id}
                    deleteMethod={handleDeleteComment}
                  />
                )}
              </div>
            </div>
          </div>
        ))
      )}
      {isAuthenticated && (
        <div className="my-4">
          <div className="card my-3 py-4 px-4 shadow-sm p-3 mb-5 bg-body rounded">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={commentSubmitHandler}
            >
              {({ values, handleChange, isSubmitting }) => (
                <FormikForm>
                  <Form.Group className="mb-3">
                    <Field
                      as="textarea"
                      className="form-control"
                      name="commentText"
                      id="commentText"
                      placeholder="Comment"
                      value={values.commentText}
                      onChange={handleChange}
                    />
                    <FormikError
                      component="div"
                      name="commentText"
                      className="text-danger"
                    />
                  </Form.Group>
                  <Form.Group className="text-center my-4">
                    <Button
                      type="submit"
                      className="btn btn-dark px-5"
                      disabled={isSubmitting}
                    >
                      {t("comments.addComment")}
                    </Button>
                  </Form.Group>
                </FormikForm>
              )}
            </Formik>
          </div>
          {error && <ErrorMessage message={error} clearError={clearError} />}
        </div>
      )}
    </div>
  );
}
