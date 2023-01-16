import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navigation from "../components/Navigation/Navigation";
import Container from "react-bootstrap/Container";

function NewClub({ data, currentUserId, currentUserData }) {
  const {...allUsers} = data.users;
  console.log(allUsers);
  return (
    <Container>
      <Navigation currentUserData={currentUserData} />
      <Button varient="primary" href="/organizations">Back</Button>
      <Form>
      <Form.Label>Club Admin</Form.Label>
        <Form.Select aria-label="Club Admins"> 
          <option>Choose admin</option>
          {allUsers.map(([id, user]) => {
              return <option value={id}>{user.name}</option>;
            })}
        </Form.Select>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>

  );
}

export default NewClub;