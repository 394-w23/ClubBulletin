import React from "react";

const Post = ({ post }) => {
  return (
    <div className="post" style={{ border: "1px solid black" }}>
      <div className="post-header">
        <h1>{post.title}</h1>
      </div>

      <div className="post-body">
        <p>{post.content}</p>
      </div>

      <div className="post-footer">
        <p>{post.likeCount}</p>
      </div>
    </div>
  );
};

export default Post;
