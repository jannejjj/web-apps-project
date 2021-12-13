import React from "react";
import Error from "./Error";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

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
          setToken(json.token);
          localStorage.setItem("authtoken", token);
        }
      });
  };

  const backToMain = () => {
    navigate("/");
  };

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
            type="text"
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
