import { useState } from "react";
import logo from "./logo.svg";
import { useDbData } from "./utilities/firebase";
import Post from "./components/Post/Post";
import "./App.css";

const App = () => {
  const [count, setCount] = useState(0);
  const [data, error] = useDbData("/");

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  return (
    <div className="App">
      {<Post post={data.posts["7a5e975c-8d61-11ed-a1eb-0242ac120002"]}></Post>}
    </div>
  );
};

export default App;
