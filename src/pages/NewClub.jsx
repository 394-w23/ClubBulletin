import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navigation from "../components/Navigation/Navigation";
import Container from "react-bootstrap/Container";

function NewClub({ data, currentUserId, currentUserData }) {
  const {...allUsers} = data.users;
  console.log(allUsers);
  const handleSubmit = (event) => {
    console.log(event);
    event.preventDefault();
    const form = event.currentTarget;
  };
  return (
    <Container>
      <Navigation currentUserData={currentUserData} />
      <Button varient="primary" href="/organizations">Back</Button>
      <Form onSubmit={handleSubmit}>
      <Form.Label>Club Admin</Form.Label>
        <Form.Select aria-label="Club Admins"> 
          <option>Choose admin</option>
          {Object.keys(allUsers).map((key,index) => {
              return <option key={key}>{allUsers[key].name}</option>;
            })}
        </Form.Select>
      <Form.Label>Club Name</Form.Label>
        <Form.Control></Form.Control><Form.Text id="ClubName"></Form.Text>
      <Form.Label>Club Description</Form.Label>
        <Form.Control></Form.Control><Form.Text id="ClubDescription"></Form.Text>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>

  );
}

export default NewClub;