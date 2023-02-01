import { useState, useEffect } from "react";
import Post from "../components/Post/Post";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
import { useDbData, useDbUpdate } from "../utilities/firebase";
import ClubSelector from "../components/ClubSelector/ClubSelector";
import { Modal, FloatingLabel } from "react-bootstrap";
import CreatePost from "../components/CreatePost/CreatePost";
import "../styles/Feed.css";
const Feed = ({ user, data }) => {
  const [selection, setSelection] = useState({ id: "all" });

  const currentUserId = user.uid;

  // something something postId to delete posts later (warning)
  if (data.users[currentUserId] === undefined) {
    const [updateDb] = useDbUpdate("/");
    updateDb({
      ["/users"]: {
        ...data.users,
        [user.uid]: { clubs: [""], ["name"]: user.displayName },
      },
    });
  }

  const allPosts = Object.entries(data.posts);
  const currentUserData = data.users[currentUserId];
  const currentClubsIds = Object.values(currentUserData.clubs);
  const filteredClubIds = selection.id === "all" ? currentClubsIds : [selection.id];
  const allClubData = Object.entries(data.clubs);

  // currentClubs is an array [ [clubId, clubData]], ...  ]
  const currentClubs = Object.entries(data.clubs).filter(([id, value]) =>
    currentClubsIds.includes(id)
  );
  // filter posts containing posts from clubs that the user is subscribed to
  const filteredPosts = allPosts.filter(([id, value]) =>
    filteredClubIds.includes(value.clubId)
  );
  // sort all posts by time
  const sortedPosts = filteredPosts.sort(([_1, post1], [_2, post2]) => {
    return parseInt(post2.posted) - parseInt(post1.posted);
  });
  // the collection of <Post> objects
  const postsResult = sortedPosts.map(([id, post]) => {
    const currentClub = data.clubs[post.clubId];
    return <Post key={id} post={post} postId={id} club={currentClub} />;
  });
  const isUserClubsEmpty = currentClubs.length == 0;
  const isCurrentFeedEmpty = sortedPosts.length == 0;

  const noSubscriptionsMessage = (
    <div className="text-center m-3">
      You haven't joined any club feeds yet! Go to <a href="/manageclubs">Clubs</a> to join
      a club.
    </div>
  );

  // these messages are displayed if the user has subscribed to clubs, but there are no posts
  const noClubPostsMessage =
    // show this message if the "All club" feeds is empty
    selection.id === "all" ? (
      <div className="text-center m-3">
        None of your subscribed clubs have posted any messages yet!
      </div>
    ) : (
      // show this message if the user is on the tab of the subscribed club with no posts
      <div className="text-center m-3">
        This club hasn't posted any messages yet!
      </div>
    );

  // if the user is not subscribed to any clubs, show the "You haven't subscribed to any clubs feeds..." message
  // Otherwise, check if the feed of messages is empty. If the feed is empty, show a message to the user telling them that
  // the club(s) have not posted any messages yet. Otherwise, show the posts themselves
  const displayResult = isUserClubsEmpty
    ? noSubscriptionsMessage
    : isCurrentFeedEmpty
    ? noClubPostsMessage
    : postsResult;

  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => {
    setModalShow(false);
  };
  const handleShow = () => setModalShow(true);

  const [alertShow, setAlertShow] = useState(false);
  const alertClose = () => {
    setDeleteSuccess("");
    setAlertShow(false);
  };
  const handleAlert = () => setAlertShow(true);

  // check if selection is all
  // if it's not all --> get the club admins and check if current user is in there.
  let selectedClubData = {};
  let isUserAdminOfSelectedClub = false;
  if (selection.id !== "all") {
    selectedClubData = allClubData.filter(([id, value]) => selection.id === id);
    console.log(selectedClubData[0]);
    const selectedClubAdmin = selectedClubData[0][1].admins;
    if (selectedClubAdmin.includes(currentUserId)) {
      console.log("is admin");
      isUserAdminOfSelectedClub = true;
    }    
  }  
  
  // const isUserAdmin =
  // selection.id != "all" && console.log("hi: ", filteredClubIds);
  console.log("selection", selection);

  return (
    <div className="App">
      <Container>
        <Navigation currentUserData={currentUserData} currentLabel="Feed" />
        <h1 className="pageTitle" data-cy="pageTitle">Your Feed</h1>
        <ClubSelector
          currentClubs={currentClubs}
          selection={selection}
          setSelection={setSelection}
        />
        

        {isUserAdminOfSelectedClub && 
        
        
        <div>
          <Modal show={modalShow} onHide={handleClose}>
            <CreatePost 
              currentUserData={currentUserData}
              clubId={selection.id}
              data={data}
              clubData={selectedClubData}
              modalShow={modalShow}
              handleClose={handleClose}
            />
          </Modal>
          <Button className="modalButton" variant="primary" onClick={handleShow}>
            Create Post
          </Button>
        </div>
        
        }
        <Row>
          <Col>{displayResult}</Col>
        </Row>
      </Container>
    </div>
  );
};

export default Feed;
