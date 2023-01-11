import React from "react";
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';

const ClubCard = ({ id, club, currentClubs }) => {
    console.log(club);
    console.log('map', currentClubs.map(([id, ]) => (id)));
    const tempImgUrl =
        "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg";

    const tempTimeMessage = "3 hours ago";

    return (
        <Card class="post-card" style={{ width: "24rem" }}>
            <Card.Header>
                <div class="row">
                    <div class="col-sm-8 post-header-text">
                        <Card.Text class="post-club-name">{club.name}</Card.Text>
                    </div>
                </div>
            </Card.Header>

            <Card.Body>
                <Card.Text class="card-post-content">{club.description}</Card.Text>
                <Button varient="primary">{currentClubs.map(([id, ]) => (id)).includes(id) ? 'Unsubscribe' : 'Subscribe' }</Button>
            </Card.Body>            
        </Card>
    );
};

export default ClubCard;
