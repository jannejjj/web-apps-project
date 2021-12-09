import React from "react";
export const Error = (props) => {
  return (
    <div
      style={{
        fontSize: 18,
        color: "gray",
        fontStyle: "italic",
        margin: "auto",
      }}
    >
      {props.error}
    </div>
  );
};

export default Error;
