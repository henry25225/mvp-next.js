import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import request from "../utils/request";
import { useAuth } from "../utils/auth";

export default function Comments({ article }) {
  const { register, handleSubmit, errors } = useForm();

  const { data: comments, error, mutate } = useSWR(
    `/article/${article.id}/comment`
  );
  const loading = !comments && !error;

  const auth = useAuth();

  const onSubmit = async ({ comment }) => {
    try {
      await request.post(
        "/comment",
        {
          comment,
          resource_type: "article",
          resource_id: article.id,
        },
        { headers: { Authorization: `Bearer ${auth.authorization}` } }
      );
      mutate();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className="mb-3">
        <h5>Comments</h5>
        {loading ? (
          <div>Loading...</div>
        ) : !comments?.length ? (
          <div>No comments.</div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id}>
              <div>
                <b>{comment.username}</b>
              </div>
              <p>{comment.content}</p>
            </div>
          ))
        )}
      </div>
      {auth && (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="addComment">
            <Form.Label>Place your comment</Form.Label>
            <Form.Control
              name="comment"
              as="textarea"
              rows={3}
              ref={register({
                required: { value: true, message: "Comment is required." },
              })}
            />
            {errors.comment && (
              <Form.Text className="text-danger">
                {errors.comment.message}
              </Form.Text>
            )}
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button type="submit">Comment</Button>
          </div>
        </Form>
      )}
    </div>
  );
}
