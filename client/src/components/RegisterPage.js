import React from "react";
import Error from "./Error";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Sends email and password to be checked against the database. If the returned json contains a "passwordError" or "error" field, the contents of the error are displayed. Otherwise the contents of json.message are displayed (success).
  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("../users/register", {
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
        console.log(json.passwordErrors);
        if (json.error) {
          setError(json.error);
        } else if (json.passwordErrors) {
          let errors = "";
          json.passwordErrors.forEach((error) => {
            errors += error.message + "\n";
          });
          setError(errors);
        } else {
          setError(json.message);
        }
      });
  };

  const proceedToLogin = () => {
    navigate("/login");
  };

  const backToMain = () => {
    navigate("/");
  };

  // A div containing the Error container, a form for registering and buttons for going to the main page and login page.
  return (
    <div style={{ paddingTop: 200, width: 700, margin: "auto" }}>
      <p>Register:</p>
      <p>
        Password should be betweem 8 and 255 characters long, contain upper- and
        lowercase letters and at least one digit.
      </p>
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
          <input type="submit" value="Register" />
        </label>
      </form>
      <input type="button" value="Proceed to login" onClick={proceedToLogin} />
      <input type="button" value="Back to main page" onClick={backToMain} />
    </div>
  );
}

export default RegisterPage;
