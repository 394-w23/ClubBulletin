import { useState } from "react";
import { useDbData } from "../utilities/firebase";
import Post from "../components/Post/Post";

const Feed = () => {
  const [count, setCount] = useState(0);
  const [data, error] = useDbData("/"); // get whole database

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  const currentUser = data.users["27e416aa-8d61-11ed-a1eb-0242ac120002"];
  const currentClubs = Object.values(currentUser.clubs);
  const postList = Object.entries(data.posts);
  //console.log(postList);
  console.log("current", currentClubs);
  console.log("post", postList);
  console.log(
    "filter",
    postList.filter(([id, value]) => currentClubs.includes(value.clubId))
  );
  const filteredList = postList.filter(([id, value]) =>
    currentClubs.includes(value.clubId)
  );
  // something something postId to delete posts later (warning)
  return (
    <div className="App">
      {filteredList.map((elem) => (
        <Post post={elem[1]}></Post>
      ))}
    </div>
  );
};

export default Feed;
