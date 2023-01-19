import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDbUpdate } from "../../utilities/firebase";
import { Container } from "react-bootstrap";
import Navigation from "../Navigation/Navigation";
import { v4 as uuidv4 } from "uuid";
import CloseButton from "react-bootstrap/CloseButton";
import { useState, useEffect } from "react";
import Alert from 'react-bootstrap/Alert';

function DeleteClub({
    currentUserData,
    clubId,
    data,
    clubData,
    modalShow,
    handleClose,
    deleteSuccess,
    setDeleteSuccess,
}) {
    const [update] = useDbUpdate(`/`);
    const [success, setSuccess] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formDataObj = Object.fromEntries(formData.entries());
        
        console.log(data);

        if (formDataObj.Confirmation == data.clubs[clubId].name) {
            handleClose();
            setDeleteSuccess("success");
        } else {
            setDeleteSuccess("danger");
        }

        // construct new object
        let updatedClubs = {};

        for (const [key,value] of Object.entries(data["clubs"])) {
            if (key != clubId) {
                updatedClubs[key] = value;
            }
        }

        let updatedPosts = {};

        for (const [key,value] of Object.entries(data["posts"])) {
            if (value["clubId"] != clubId) {
                updatedPosts[key] = value;
            }
        }

        let updatedUsers = {};
        let updatedUser = {};
        let userClubs = [];

        for (const [key,value] of Object.entries(data["users"])) {
            updatedUser = {};
            userClubs = []
            for (var i=0; i < value["clubs"].length; i++) {
                if (value["clubs"][i] != clubId) {
                    userClubs.push(value["clubs"][i]);
                }
            }
            updatedUser["clubs"] = userClubs;
            updatedUser["name"] = value["name"];
            updatedUsers[key] = updatedUser;
        }

        

        // update({
        //     ["/clubs"]: updatedClubs,
        //     ["/posts"]: updatedPosts,
        //     ["/users"]: updatedUsers    
        // });

    };
    return (
        <Container style={{ padding: "10px" }}>
            {/* <Navigation currentUserData={currentUserData} />
            <Button varient="primary" href="/organizations">Back</Button> */}
            {/* {deleteSuccess == "success" && <Alert key="success" variant="success">
                Club deletion was a success!
            </Alert>} */}
            {deleteSuccess == "danger" && <Alert key="danger" variant="danger">
                Club deletion failed. Please confirm the club you're deleting.
            </Alert>}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                }}
            >
                <h2>Are you sure?</h2>
                <CloseButton onClick={handleClose} />
            </div>

            <Form onSubmit={handleSubmit}>
                <Form.Label>Enter name of the club to confirm:</Form.Label>
                <Form.Control type="text" name="Confirmation"></Form.Control>

                <Button variant="danger" type="submit" style={{ marginTop: "10px" }}>
                    Delete Club
                </Button>
            </Form>
        </Container>
    );
}
export default DeleteClub;
