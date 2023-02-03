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
  const [imageAsFile, setImageAsFile] = useState("");
  const [percent, setPercent] = useState(0);
  const [updateDb] = useDbUpdate("/");
  const allInputs = { imgUrl: "" };
  const [imageAsUrl, setImageAsUrl] = useState("");
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

    if (formDataObj.ClubName != "" && formDataObj.ClubDescription != "" && formDataObj.ClubPic != "") {
      console.log("FORM DATA", data);
      getUrl(formDataObj.ClubPic);
      console.log("IMG URL", imageAsUrl);
      for (const [key, value] of Object.entries(data["clubs"])) {
        if (formDataObj.ClubName === value.name) {
          clubExists = true;
          break;
        }
      }
      if (clubExists) {
        setCreate("danger");
      } else {

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
        setCreate("success");
        setTimeout(() => closeWindow(), 1000);
      }
    } else {
      setSuccess("danger");
    }
  };

  const getUrl = (clubPic) => {
    const file = clubPic;

    if (!file) {
      alert("Please upload an image first!");
    }

    setImageAsFile((imageFile) => file);

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
          setImageAsUrl(url);
          console.log("IMG As URL", imageAsUrl);
          console.log("getDownloadURl", url);
        });
      });
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
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}>
          <h2>Create New Club</h2>
          <CloseButton onClick={closeWindow} />

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

        <Form.Label style={{ marginTop: "20px" }}>Add Photo</Form.Label>
        <Form.Control
          type="file"
          name="ClubPic"
        ></Form.Control>

        <Button variant="primary" type="submit" style={{ marginTop: "20px" }}>
          Create
        </Button>
      </Form>
    </Container>
  );
}

export default NewClub;
