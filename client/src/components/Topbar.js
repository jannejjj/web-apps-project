import React from "react";
import { useNavigate } from "react-router-dom";
function Topbar() {
  const navigate = useNavigate();

  const login = () => {
    navigate("/login");
  };

  const register = () => {
    navigate("/register");
  };

  return (
    <div
      style={{
        backgroundColor: "#4fc3f7",
        width: 1000,
        borderRadius: 10,
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: 35 }}>Welcome to Snipper!</h1>
      <div style={{ padding: 10 }}>
        <button onClick={login}>Login</button>
        <button onClick={register}>Register</button>
        <button>Logout</button>
      </div>
    </div>
  );
}

export default Topbar;