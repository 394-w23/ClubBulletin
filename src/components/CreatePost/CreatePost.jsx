import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDbUpdate } from "../../utilities/firebase";
import { Container } from "react-bootstrap";
import Navigation from "../Navigation/Navigation";
import { v4 as uuidv4 } from "uuid";

function CreatePost({
  currentUserData,
  clubId,
  data,
  clubData,
  modalShow,
  setModalShow,
}) {
  const [update] = useDbUpdate(`/`);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());

    // update /posts with a new post
    const newid = uuidv4();

    update({
      ["/posts"]: {
        ...data.posts,
        [newid]: {
          clubId: clubId,
          content: formDataObj.PostContent,
          title: formDataObj.PostTitle,
          posted: "datetime",
        },
      },
    });
  };
  return (
    <Container>
      <h5>Create a post for {clubData.name}</h5>
      <Form onSubmit={handleSubmit}>
        <Form.Label>Post Title</Form.Label>
        <Form.Control type="text" name="PostTitle"></Form.Control>

        <Form.Label>Post Content</Form.Label>
        <Form.Control type="text" name="PostContent"></Form.Control>

        <Button varient="primary" onClick={() => setModalShow(false)}>
          Back
        </Button>

        <Button
          variant="primary"
          type="submit"
          onClick={() => setModalShow(false)}
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
}
export default CreatePost;
