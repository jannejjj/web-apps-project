import "./App.css";
import Feed from "./components/Feed";
import Topbar from "./components/Topbar";
import SnippetPage from "./components/SnippetPage";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";

// Routes for the feed page, snippet page and register / login
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <div style={{ margin: "auto", width: 900 }}>
                <Topbar />
                <Feed />
              </div>
            }
          />
          <Route
            path="/snippet/:id"
            element={
              <div style={{ margin: "auto", width: 900 }}>
                <Topbar />
                <SnippetPage />
              </div>
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
