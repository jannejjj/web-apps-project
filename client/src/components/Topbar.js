import React from "react";
function Topbar() {
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
        <button>Login</button>
        <button>Register</button>
      </div>
    </div>
  );
}

export default Topbar;
