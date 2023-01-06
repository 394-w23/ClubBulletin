import { useState } from "react";
import logo from "./logo.svg";
import { useDbData } from "./utilities/firebase";
import Post from "./components/Post/Post";
import "./App.css";

const App = () => {
  const [count, setCount] = useState(0);
  const [data, error] = useDbData("/"); // get whole database

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  const currentUser = data.users["27e416aa-8d61-11ed-a1eb-0242ac120002"];
  const currentClubs = Object.entries(currentUser.clubs);
  const postList = Object.entries(data.posts);
  //console.log(postList);
  console.log(postList.filter(([id, value]) => currentClubs.includes(value.clubId)));
  return (
    // <div className="App">
    //   {<Post post={}></Post>}
    // </div>
    <div>

    </div>
  );
};

export default App;
