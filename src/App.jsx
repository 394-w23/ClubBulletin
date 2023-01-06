import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feed from "./pages/Feed";
import Organizations from "./pages/Organizations";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Feed />}></Route>
        <Route exact path="/organizations" element={<Organizations />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
