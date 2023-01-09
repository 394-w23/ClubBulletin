import { useState } from "react";
import { useDbData } from "../utilities/firebase";
import Post from "../components/Post/Post";

const Feed = () => {
  const [count, setCount] = useState(0);
  const [data, error] = useDbData("/"); // get whole database

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;
  // console.log("checking entires",Object.entries(data.clubs));
  const currentUser = data.users["27e416aa-8d61-11ed-a1eb-0242ac120002"];
  const currentClubsIds = Object.values(currentUser.clubs);
  const currentClubs = Object.entries(data.clubs).filter(([id, value]) =>
    currentClubsIds.includes(id)
  );
  const allPosts = Object.entries(data.posts);


  console.log("current clubs ids", currentClubsIds);
  console.log("current clubs", currentClubs);
  console.log("post", allPosts);
  console.log(
    "filter",
    allPosts.filter(([id, value]) => currentClubsIds.includes(value.clubId))
  );
  const filteredPosts = allPosts.filter(([id, value]) =>
  currentClubsIds.includes(value.clubId)
  );
  // something something postId to delete posts later (warning)
  
  return (
    <div className="App">

      {filteredPosts.map(([id, post]) => (
        <Post key={id} post={post}></Post>
      ))}
    </div>
  );
};

export default Feed;
