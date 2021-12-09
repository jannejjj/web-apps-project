import React from "react";
export const Snippet = (props) => {
  const upVote = (id) => {
    // Pitänee keksiä miten nää votet vois tehä
  };

  const downVote = (id) => {
    // Tarkasta onko user votennu jo tätä snippettiä
  };

  return (
    <div
      onClick={props.onClick}
      style={{
        align: "center",
        margin: "auto",
        backgroundColor: "#8aebff",
        width: 600,
        borderRadius: 10,
      }}
    >
      <p style={{ margin: 4, fontSize: 25 }}>{props.data.title}</p>
      <code> {props.data.snippet}</code>
      <div>
        <button onClick={upVote} style={{ margin: 6 }}>
          {props.data.upvotes} 👍
        </button>
        <button onClick={downVote} style={{ margin: 6 }}>
          {props.data.downvotes} 👎
        </button>
      </div>
      <span>{props.data.timestamp}</span>
    </div>
  );
};

export default Snippet;
