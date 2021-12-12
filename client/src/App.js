import "./App.css";
import Feed from "./components/Feed";
import Topbar from "./components/Topbar";
import SnippetPage from "./components/SnippetPage";
import SnippetForm from "./components/SnippetForm";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Topbar />
                <SnippetForm />
                <Feed />
              </div>
            }
          />
          <Route
            path="/snippet/:id"
            element={
              <div>
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
