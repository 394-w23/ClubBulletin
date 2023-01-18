import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDbUpdate } from "../../utilities/firebase";
import { Container } from "react-bootstrap";
import Navigation from "../Navigation/Navigation";
import { v4 as uuidv4 } from "uuid";
import CloseButton from "react-bootstrap/CloseButton";
import { useState, useEffect } from "react";
import Alert from 'react-bootstrap/Alert';

function CreatePost({
    currentUserData, 
    clubId, 
    data, 
    clubData, 
    modalShow,
    handleClose, 
    msgSuccess, 
    setMsgSuccess
}) {
    const [update] = useDbUpdate(`/`);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formDataObj = Object.fromEntries(formData.entries());

        if (formDataObj.PostTitle != "" && formDataObj.PostContent != "") {
            // update /posts with a new post
            const newid = uuidv4();
            const postTime = new Date().getTime();

            update({
                ["/posts"]: {
                    ...data.posts,
                    [newid]: {
                        clubId: clubId,
                        content: formDataObj.PostContent,
                        title: formDataObj.PostTitle,
                        posted: postTime,
                        likeCount: 0,
                    },
                },
            });
            handleClose();
            setMsgSuccess("success");
        }
        else {
            setMsgSuccess("danger");
        }

    };
    return (
        <Container style={{ padding: "10px" }}>
            {/* <Navigation currentUserData={currentUserData} />
            <Button varient="primary" href="/organizations">Back</Button> */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                }}
            >
                <h2>Create New Post</h2>
                <CloseButton onClick={handleClose} />
            </div>
            {msgSuccess == "danger" && <Alert key="danger" variant="danger">
                Failed to create post. Please check your inputs and try again.
            </Alert>
            }
            <Form onSubmit={handleSubmit}>
                <Form.Label>Post Title</Form.Label>
                <Form.Control type="text" name="PostTitle"></Form.Control>

                <Form.Label>Post Content</Form.Label>
                <Form.Control type="text" name="PostContent" as="textarea" rows={3}></Form.Control>

                <Button variant="primary" type="submit" style={{ marginTop: "10px" }}>
                    Submit
                </Button>
            </Form>
        </Container>
    );
}
export default CreatePost;
