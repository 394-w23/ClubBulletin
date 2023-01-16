import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navigation from "../components/Navigation/Navigation";
import Container from "react-bootstrap/Container";
import { useDbUpdate } from "../utilities/firebase";
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from "react";
import Alert from 'react-bootstrap/Alert';

function NewClub({ data, user }) {
  const [success, setSuccess] = useState();
  const currentUserId = user.uid
  const currentUserData = data.users[currentUserId];
  const { ...allUsers } = data.users;
  const [update] = useDbUpdate(`/`);
  const [updateUser] = useDbUpdate(`/users/${currentUserId}`);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());

    // update /clubs with a new club 
    const newid = uuidv4();

    update({
      ['/clubs']: {
        ...data.clubs,
        [newid]:
        {
          'description': formDataObj.ClubDescription,
          'admins': ['', currentUserId],
          'name': formDataObj.ClubName,
          'members': ['']
        }
      }
    })

    // update /users.<adminId>.clubs with the new club 
    updateUser({
      ["/clubs"]: [...currentUserData.clubs, newid]
    });

    // display success to user
    setSuccess("success");
    // submitMessage("warning");
  };

  return (
    <Container>
      <Navigation currentUserData={currentUserData} />
      <Button varient="primary" href="/organizations">Back</Button>
      {success && <Alert key={success} variant={success}>
        Club creation was a {success}!
      </Alert>}
      <Form onSubmit={handleSubmit}>
        {/* <Form.Label>Club Admin</Form.Label>
        <Form.Select aria-label="Club Admins" name="ClubAdmin">
          <option>Choose admin</option>
          {Object.keys(allUsers).map((key, index) => {
            return <option key={key}>{allUsers[key].name}</option>;
          })}
        </Form.Select> */}

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