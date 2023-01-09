import React from "react";
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';

const Post = ({ post }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>
          {post.title}
        </Card.Title>
        <Card.Subtitle>
          Posted datetime
        </Card.Subtitle>
        <Card.Text>
          {post.content}
        </Card.Text>        
      </Card.Body>  
      <ListGroup variant="flush">
        { post.likeCount } { post.likeCount == 1 ? "like" : "likes" }
      </ListGroup>    
    </Card>
    
  );
};

export default Post;


