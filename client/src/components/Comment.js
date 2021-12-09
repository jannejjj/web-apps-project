import React from "react";
export const Comment = (props) => {
  return (
    <div
      style={{
        align: "center",
        margin: "auto",
        backgroundColor: "#a1efff",
        width: 600,
        borderRadius: 10,
      }}
    >
      <p> {props.data.comment}</p>
      <div>
        <button style={{ margin: 6 }}> {props.data.upvotes} 👍 </button>
        <button style={{ margin: 6 }}> {props.data.downvotes} 👎 </button>
      </div>
      <span>{props.data.timestamp}</span>
    </div>
  );
};

export default Comment;
