import { useForm } from "../../hooks/useForm";
import { Button, Form } from "react-bootstrap";
import EditRemoveButton from "../edit-remove-button/EditRemoveButton";
import styles from "./CommentSection.module.css";

export default function CommentSection({ comments = [] }) {
  console.log(comments);

  const initialValues = {
    description: "",
  };

  const commentSubmitHandler = ({ itemId, description, userId }) => {
    saveComment(itemId, description, userId);
    // navigate("/");
  };

  const { changeHandler, submitHandler, values } = useForm(
    initialValues,
    commentSubmitHandler
  );

  return (
    <div className="my-4">
      <div>
        <h4 style={{ fontFamily: "Lora" }} className="ms-1">
          Comment
        </h4>
      </div>
      {comments.length == 0 ? (
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
              <h5 className="card-title ms-1 mb-0">
                {comment.user.firstName} {comment.user.lastName}
              </h5>
              <div className="ms-auto text-end my-2 text-greay-600 star">
                {new Date(comment.date).toLocaleDateString()}
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <p className="card-text my-1">{comment.text}</p>
              <div
                className={`${styles["itemSvg"]} text-end my-1 text-grey-600`}
              >
                <EditRemoveButton
                  editTo={"/articleForm"}
                  deleteToSucces={"/articles"}
                />
              </div>
            </div>
          </div>
        ))
      )}
      <div className="my-4">
        <div className="card my-3 py-4 px-4">
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                className="form-control"
                value={values.description}
                name="description"
                id="description"
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
      </div>
    </div>
  );
}
