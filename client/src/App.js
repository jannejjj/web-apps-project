import "./App.css";
import Feed from "./components/Feed";
import Topbar from "./components/Topbar";
import SnippetPage from "./components/SnippetPage";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Topbar />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/snippet/:id" element={<SnippetPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
