import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feed from "./pages/Feed";
import Organizations from "./pages/Organizations";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDbData } from "./utilities/firebase";

import "./App.css";

function App() {
  const [data, error] = useDbData("/"); // get whole database
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Feed data={data} error={error}/>}></Route>
        <Route exact path="/organizations" element={<Organizations data={data} error={error} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
