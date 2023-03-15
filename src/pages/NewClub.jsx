import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { useDbUpdate } from "../utilities/firebase";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import CloseButton from "react-bootstrap/CloseButton";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../utilities/firebase";

function NewClub({ data, user, handleClose }) {
  const [success, setSuccess] = useState();
  const [create, setCreate] = useState();

  const [percent, setPercent] = useState(0);

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
  const newid = uuidv4();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());

    let clubExists = false;

    if (
      formDataObj.ClubName != "" &&
      formDataObj.ClubDescription != "" &&
      formDataObj.ClubPic != ""
    ) {
      for (const [key, value] of Object.entries(data["clubs"])) {
        if (formDataObj.ClubName === value.name) {
          clubExists = true;
          break;
        }
      }
      if (clubExists) {
        setCreate("danger");
      } else {
        const file = formDataObj.ClubPic;
        const storageRef = ref(storage, `/files/${file.name}`); // progress can be paused and resumed. It also exposes progress updates. // Receives the storage reference and the file to upload.

        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            ); // update progress
            setPercent(percent);
          },
          (err) => console.log(err),
          () => {
            // download url
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              update({
                ["/clubs"]: {
                  ...data.clubs,
                  [newid]: {
                    description: formDataObj.ClubDescription,
                    admins: ["", rootAdminId, currentUserId],
                    name: formDataObj.ClubName,
                    members: ["", currentUserId],
                    picLink: url,
                  },
                },
              });
            });
          }
        );

        // update /users.<adminId>.clubs with the new club
        updateUser({
          ["/clubs"]: [...currentUserData.clubs, newid],
        });

        // display success to user
        setSuccess("success");
        setCreate("success");
        setTimeout(() => closeWindow(), 1000);
      }
    } else {
      setSuccess("danger");
    }
  };

  return (
    <Container style={{ padding: "10px" }}>
      {success == "success" && (
        <Alert key={success} variant={success}>
          Club creation was a {success}!
        </Alert>
      )}
      {create == "danger" && (
        <Alert key={create} variant={create}>
          Club already exists!
        </Alert>
      )}
      {success == "danger" && (
        <Alert key={success} variant={success} data-cy="createClubError">
          Club creation failed. Please check your inputs and try again.
        </Alert>
      )}
      <Form onSubmit={handleSubmit} data-cy="newClubForm" data-testid="add-club-form">
        {/* <Form.Label>Club Admin</Form.Label>
        <Form.Select aria-label="Club Admins" name="ClubAdmin">
          <option>Choose admin</option>
          {Object.keys(allUsers).map((key, index) => {
            return <option key={key}>{allUsers[key].name}</option>;
          })}
        </Form.Select> */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <h2 data-testid="create-new-club-title" data-cy='createClubModalHeader'>Create New Club</h2>
          <CloseButton onClick={closeWindow} />
        </div>

        <Form.Label data-test-id="add-club-name-title">Club Name</Form.Label>
        <Form.Control type="text" name="ClubName" data-cy="clubName" data-testid="add-club-name"></Form.Control>

        <Form.Label data-testid="add-club-description-title" style={{ marginTop: "20px" }}>Club Description</Form.Label>
        <Form.Control
          type="text"
          name="ClubDescription"
          as="textarea"
          rows={3}
          data-cy="clubDescription"
          data-testid="add-club-description"
        ></Form.Control>

        <Form.Label data-testid="add-photo-title" style={{ marginTop: "20px" }}>Add Photo</Form.Label>
        <Form.Control type="file" name="ClubPic" data-cy="clubPic" data-testid="add-club-pic"></Form.Control>

        <Button variant="primary" type="submit" style={{ marginTop: "20px" }} data-cy="submitNewClub" data-testid="submit-new-club">
          Create
        </Button>
      </Form>
    </Container>
  );
}

export default NewClub;
