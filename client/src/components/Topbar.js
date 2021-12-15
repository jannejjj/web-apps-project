import React from "react";
import { useNavigate } from "react-router-dom";
function Topbar() {
  const navigate = useNavigate();
  const authtoken = localStorage.getItem("authtoken");

  const logout = () => {
    localStorage.removeItem("authtoken");
    navigate("/");
  };

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
        width: 900,
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
        {!authtoken && <button onClick={login}>Login</button>}
        {!authtoken && <button onClick={register}>Register</button>}
        {authtoken && <button onClick={logout}>Logout</button>}
      </div>
    </div>
  );
}

export default Topbar;
