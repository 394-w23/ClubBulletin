import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Navigation from "../components/Navigation/Navigation";
import Container from "react-bootstrap/Container";
import { useDbUpdate } from "../utilities/firebase";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import CloseButton from "react-bootstrap/CloseButton";

function NewClub({ data, user, handleClose }) {
  const [success, setSuccess] = useState();
  const currentUserId = user.uid;
  const rootAdminId = "HcYJNncMwQQbmnmYKWNln0FbqtG3";
  const currentUserData = data.users[currentUserId];
  const { ...allUsers } = data.users;
  const [update] = useDbUpdate(`/`);
  const [updateUser] = useDbUpdate(`/users/${currentUserId}`);
  const [msgSuccess, setMsgSuccess] = useState();
  const closeWindow = () => {
    setMsgSuccess("");
    handleClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());

    if (formDataObj.ClubName != "" && formDataObj.ClubDescription != "") {
      // update /clubs with a new club
      const newid = uuidv4();

      update({
        ["/clubs"]: {
          ...data.clubs,
          [newid]: {
            description: formDataObj.ClubDescription,
            admins: ["", rootAdminId, currentUserId],
            name: formDataObj.ClubName,
            members: ["", currentUserId],
          },
        },
      });

      // update /users.<adminId>.clubs with the new club
      updateUser({
        ["/clubs"]: [...currentUserData.clubs, newid],
      });

      // display success to user
      setSuccess("success");
      setTimeout(() => closeWindow(), 1000);
    } else {
      setSuccess("danger");
    }
  };

  return (
    <Container>
      <Navigation currentUserData={currentUserData} />
      {success == "success" && (
        <Alert key={success} variant={success}>
          Club creation was a {success}!
        </Alert>
      )}
      {success == "danger" && (
        <Alert key={success} variant={success}>
          Club creation failed. Please check your inputs and try again.
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        {/* <Form.Label>Club Admin</Form.Label>
        <Form.Select aria-label="Club Admins" name="ClubAdmin">
          <option>Choose admin</option>
          {Object.keys(allUsers).map((key, index) => {
            return <option key={key}>{allUsers[key].name}</option>;
          })}
        </Form.Select> */}
        <div className="">
          <h1>Create New Club</h1>
        </div>
        <div className="mb-3">
          <Link to="/manageclubs" relative="path">
            <Button variant="outline-secondary">Back to manage</Button>
          </Link>
        </div>

        <Form.Label>Club Name</Form.Label>
        <Form.Control type="text" name="ClubName"></Form.Control>

        <Form.Label style={{ marginTop: "20px" }}>Club Description</Form.Label>
        <Form.Control
          type="text"
          name="ClubDescription"
          as="textarea"
          rows={3}
        ></Form.Control>

        <Button variant="primary" type="submit" style={{ marginTop: "20px" }}>
          Create
        </Button>
        <CloseButton onClick={closeWindow} />
      </Form>
    </Container>
  );
}

export default NewClub;
