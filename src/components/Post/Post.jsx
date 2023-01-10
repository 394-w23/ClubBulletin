import React from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import "./Post.css";

const Post = ({ post, club }) => {
  const tempImgUrl =
    "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg";

  const tempTimeMessage = "3 hours ago";

  return (
    <Card class="post-card" style={{ width: "24rem" }}>
      <Card.Header>
        <div class="col-sm-12">
          <div class="row">
            {/* <div class="col-sm-3">
              <Card.Img src={tempImgUrl} class="post-profile-image"></Card.Img>
            </div> */}
            <div class="col-sm-8 post-header-text">
              <Card.Text class="post-club-name">{club.name}</Card.Text>
              <Card.Text class="post-subtext">{tempTimeMessage}</Card.Text>
            </div>
          </div>
        </div>
      </Card.Header>

      <Card.Body>
        <Card.Text as="h5">{post.title}</Card.Text>
        <Card.Text class="card-post-content">{post.content}</Card.Text>
      </Card.Body>
      <ListGroup variant="flush">
        {post.likeCount} {post.likeCount == 1 ? "like" : "likes"}
      </ListGroup>
    </Card>
  );
};

export default Post;
