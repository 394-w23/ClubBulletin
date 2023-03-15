import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDbUpdate } from "../../utilities/firebase";
import { Container } from "react-bootstrap";
import Navigation from "../Navigation/Navigation";
import { v4 as uuidv4 } from "uuid";
import CloseButton from "react-bootstrap/CloseButton";
import { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";

function CreatePost({
    currentUserData,
    clubId,
    data,
    clubData,
    modalShow,
    handleClose
}) {
    const [update] = useDbUpdate(`/`);
    const [msgSuccess, setMsgSuccess] = useState();
    const closeWindow = () => {
        setMsgSuccess("");
        handleClose();
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formDataObj = Object.fromEntries(formData.entries());

        if (formDataObj.PostTitle != "" && formDataObj.PostContent != "") {
            // update /posts with a new post
            const newid = uuidv4();
            const postTime = new Date().getTime();
            const stringTime = postTime.toString();

            update({
                ["/posts"]: {
                    ...data.posts,
                    [newid]: {
                        clubId: clubId,
                        content: formDataObj.PostContent,
                        title: formDataObj.PostTitle,
                        posted: stringTime,
                        likeCount: 0,
                    },
                },
            });
            setMsgSuccess("success");
            setTimeout(() => closeWindow(), 1000);
            
        } else {
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
                <CloseButton onClick={closeWindow} />
            </div>
            {msgSuccess == "success" && <Alert key="success" variant="success">
                Post was successfully uploaded!
            </Alert>
            }
            {msgSuccess == "danger" && (
                <Alert key="danger" variant="danger">
                    Failed to create post. Please make sure you filled all inputs and try again.
                </Alert>
            )}
            <Form onSubmit={handleSubmit}>
                <Form.Label>Post Title</Form.Label>
                <Form.Control type="text" name="PostTitle" data-testid="create-post-title"></Form.Control>

                <Form.Label>Post Content</Form.Label>
                <Form.Control
                    type="text"
                    name="PostContent"
                    data-testid="create-post-body"
                    as="textarea"
                    rows={3}
                ></Form.Control>

                <Button variant="primary" type="submit" data-testid="submit-create-post" style={{ marginTop: "10px" }}>
                    Submit
                </Button>
            </Form>
        </Container>
    );
}
export default CreatePost;
