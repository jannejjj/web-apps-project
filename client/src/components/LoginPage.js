import React from "react";
import Error from "./Error";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Sends email and password to be registered to the database. If the returned json contains an error field, the contents are displayed. Errors are related to the password being incorrect or the email not being a proper email. Otherwise the contents of json.message are displayed
  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("../users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          setError(json.error);
        } else {
          setError(json.message);
          localStorage.setItem("authtoken", json.token);
        }
      });
  };

  const backToMain = () => {
    navigate("/");
  };

  // A div containing the error container, a form for logging in and a button for returning to the main page.
  return (
    <div style={{ paddingTop: 200, width: 700, margin: "auto" }}>
      <Error error={error} />
      <form onSubmit={handleSubmit}>
        <label style={{ fontSize: 25, color: "black" }}>
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value="Login" />
        </label>
      </form>

      <input type="button" value="Back to the main page" onClick={backToMain} />
    </div>
  );
}

export default LoginPage;
