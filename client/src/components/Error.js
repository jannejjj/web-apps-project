/* This error component is used whenever there's a need to display an error returned from back-end, such as when trying to post a duplicate snippet*/

import React from "react";
export const Error = (props) => {
  return (
    <div
      style={{
        fontSize: 20,
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
