import { useParams } from "react-router-dom";
import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useCreateComment, useGetAllComments } from "../../hooks/useComments";
import { useAuthContext } from "../../contexts/authContext";
import { Button, Form } from "react-bootstrap";
import EditRemoveButton from "../edit-remove-button/EditRemoveButton";
import styles from "./CommentSection.module.css";
import ErrorMessage from "../error-message/ErrorMessage";

export default function CommentSection() {
  const { articleId } = useParams();
  const { userId, email, isAuthenticated } = useAuthContext();
  const [error, setError] = useState();

  const [comments, setComments] = useGetAllComments(articleId);
  const createComment = useCreateComment();

  const initialValues = {
    commentText: "",
  };

  const commentSubmitHandler = async ({ commentText }) => {
    try {
      const newComment = await createComment(articleId, commentText);
      setComments((oldComment) => [
        ...oldComment,
        { ...newComment, author: { email } },
      ]);
    } catch (err) {
      setError(err.message);
    }
  };

  const { changeHandler, submitHandler, values } = useForm(
    initialValues,
    commentSubmitHandler
  );

  const clearError = () => {
    setError(null);
  };

  // console.log(comments);

  return (
    <div className="my-4">
      <div>
        <h4 style={{ fontFamily: "Lora" }} className="ms-1">
          Comment
        </h4>
      </div>
      {comments.length === 0 ? (
        <div className="card my-3 py-2 px-3">
          <div className="d-flex justify-content-center">
            <h6 className="ms-1 my-2">
              There are no article comments available!
            </h6>
          </div>
        </div>
      ) : (
        comments.map((comment) => (
          <div key={comment._id} className="card my-3 py-2 px-3">
            <div className="flex-grow-1 d-flex align-items-center">
              <h5 className="card-title ms-1 mb-0">{comment.author.email}</h5>
              <div className="ms-auto text-end my-2 text-greay-600 star">
                {new Date(comment._createdOn).toLocaleDateString()}
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <p className="card-text my-1">{comment.commentText}</p>
              <div
                className={`${styles["itemSvg"]} text-end my-1 text-grey-600`}
              >
                {userId === comment._ownerId && (
                  <EditRemoveButton
                    editTo={"/articleForm"}
                    deleteToSucces={"/articles"}
                  />
                )}
              </div>
            </div>
          </div>
        ))
      )}
      {isAuthenticated && (
        <div className="my-4">
          <div className="card my-3 py-4 px-4">
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  className="form-control"
                  value={values.commentText}
                  name="commentText"
                  id="commentText"
                  placeholder="Comment"
                  onChange={changeHandler}
                  required
                />
              </Form.Group>
              <Form.Group className="text-center my-4">
                <Button type="submit" className="btn btn-dark px-5">
                  Add comment
                </Button>
              </Form.Group>
            </Form>
          </div>
          {error && <ErrorMessage message={error} clearError={clearError} />}
        </div>
      )}
    </div>
  );
}
