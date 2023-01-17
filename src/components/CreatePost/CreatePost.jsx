import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDbUpdate } from '../../utilities/firebase';
import { Container } from 'react-bootstrap';
import Navigation from '../Navigation/Navigation';
import { v4 as uuidv4 } from 'uuid';
import CloseButton from 'react-bootstrap/CloseButton';

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
            ['/posts']: {
                ...data.posts,
                [newid]:
                {
                    'clubId': clubId,
                    'content': formDataObj.PostContent,
                    'title': formDataObj.PostTitle,
                    'posted': 'datetime'
                }
            }
        });
    }
    return (
        <Container>
            <Navigation currentUserData={currentUserData} />
            <Button varient="primary" href="/organizations">Back</Button>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Post Title</Form.Label>
                <Form.Control type="text" name="PostTitle"></Form.Control>

        <Form.Label>Post Content</Form.Label>
        <Form.Control type="text" name="PostContent"></Form.Control>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}
export default CreatePost;
