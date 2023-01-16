import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navigation from "../components/Navigation/Navigation";
import Container from "react-bootstrap/Container";
import { useDbUpdate } from "../../utilities/firebase";

function NewClub({ data, currentUserId, currentUserData }) {
  const { ...allUsers } = data.users;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj);

    const [updateClub] = useDbUpdate(`/clubs`);

  };

  return (
    <Container>
      <Navigation currentUserData={currentUserData} />
      <Button varient="primary" href="/organizations">Back</Button>

      <Form onSubmit={handleSubmit}>
        <Form.Label>Club Admin</Form.Label>
        <Form.Select aria-label="Club Admins" name="ClubAdmin">
          <option>Choose admin</option>
          {Object.keys(allUsers).map((key, index) => {
            return <option key={key}>{allUsers[key].name}</option>;
          })}
        </Form.Select>

        <Form.Label>Club Name</Form.Label>
        <Form.Control type="text" name="ClubName"></Form.Control>

        <Form.Label>Club Description</Form.Label>
        <Form.Control type="text" name="ClubDescription"></Form.Control>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>

  );
}

export default NewClub;