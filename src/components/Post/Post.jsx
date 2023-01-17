import React from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState, useEffect } from "react";
import * as moment from "moment";

import { useDbUpdate } from "../../utilities/firebase";

import "./Post.css";

const Post = ({ post, postId, club }) => {
  // const tempImgUrl =
  //   "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg";

  const [updatePost] = useDbUpdate(`/posts/${postId}`);

  const updateLikeCount = (change) => {
    setIsPostLiked(!isPostLiked);
    updatePost({ ["/likeCount"]: (post.likeCount += change) });
  };

  const timestamp = new Date(post.posted);
  const postTimeLabel =
    post.posted === "datetime" ? "3 hours ago" : moment(timestamp).fromNow();

  const [isPostLiked, setIsPostLiked] = useState(false);

  return (
    <Card className="post-card" style={{ width: "24rem" }}>
      <Card.Header>
        <div className="col-sm-12">
          <div className="row">
            {/* <div className="col-sm-3">
              <Card.Img src={tempImgUrl} className="post-profile-image"></Card.Img>
            </div> */}
            <div className="col-sm-8 post-header-text">
              <Card.Text className="post-club-name">{club.name}</Card.Text>
              <Card.Text className="post-subtext">{postTimeLabel}</Card.Text>
            </div>
          </div>
        </div>
      </Card.Header>

      <Card.Body>
        <Card.Text as="h5">{post.title}</Card.Text>
        <Card.Text className="card-post-content">{post.content}</Card.Text>
      </Card.Body>
      <ListGroup variant="flush">
        <div>
          {isPostLiked ? (
            <FavoriteIcon
              onClick={() => updateLikeCount(-1)}
              className="post-like-icon"
              style={{ fill: "red" }}
            ></FavoriteIcon>
          ) : (
            <FavoriteBorderIcon
              onClick={() => updateLikeCount(1)}
              className="post-like-icon"
            ></FavoriteBorderIcon>
          )}
          {post.likeCount} {post.likeCount == 1 ? "like" : "likes"}
        </div>
      </ListGroup>
    </Card>
  );
};

export default Post;
