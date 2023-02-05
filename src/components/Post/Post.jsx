import React from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState, useEffect } from "react";
import moment from "moment/moment";

import { useDbUpdate } from "../../utilities/firebase";

import "./Post.css";

const Post = ({ post, postId, club }) => {
  const [updatePost] = useDbUpdate(`/posts/${postId}`);

  const updateLikeCount = (change) => {
    setIsPostLiked(!isPostLiked);
    updatePost({ ["/likeCount"]: (post.likeCount += change) });
  };

  const postTimeLabel =
    post.posted === "datetime"
      ? "3 hours ago"
      : moment(new Date(parseInt(post.posted))).fromNow();

  const [isPostLiked, setIsPostLiked] = useState(false);

  return (
    <Card className="post-card my-3">
      <Card.Header>
        <div className="col-sm-12">
          <div className="row">
            <div className="col-sm-1">
              <Card.Img
                src={club.picLink}
                className="post-profile-image"
              ></Card.Img>
            </div>
            <div className="col-sm-8 post-header-text">
              <Card.Text className="post-club-name">{club.name}</Card.Text>
              <Card.Text className="post-subtext">{postTimeLabel}</Card.Text>
            </div>
          </div>
        </div>
      </Card.Header>

      <Card.Body>
        <Card.Text as="h5" className="post-title">
          {post.title}
        </Card.Text>
        <Card.Text className="card-post-content">{post.content}</Card.Text>
      </Card.Body>
      <ListGroup variant="flush">
        <div>
          {isPostLiked ? (
            <FavoriteIcon
              onClick={() => updateLikeCount(-1)}
              className="post-like-icon"
              style={{ fill: "purple" }}
              data-cy="pageTitle"
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
