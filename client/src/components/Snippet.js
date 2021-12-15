import React from "react";

export const Snippet = (props) => {
  const upVote = (id) => {
    // Pitänee keksiä miten nää votet vois tehä
  };

  const downVote = (id) => {
    // Tarkasta onko user votennu jo tätä snippettiä
  };

  const edit = (id) => {};

  return (
    <div
      onClick={props.onClick}
      style={{
        margin: "0.5rem auto",
        backgroundColor: "#8bf6ff",
        width: 700,
        borderRadius: 10,
        padding: 5,
        whiteSpace: "pre-wrap",
      }}
    >
      <p style={{ margin: 4, fontSize: 25 }}>{props.data.title}</p>
      <pre>
        <code> {props.data.snippet}</code>
      </pre>
      <div>
        <button onClick={upVote} style={{ margin: 6 }}>
          {props.data.upvotes} 👍
        </button>
        <button onClick={downVote} style={{ margin: 6 }}>
          {props.data.downvotes} 👎
        </button>
        <button onClick={edit} style={{ margin: 6 }}>
          Edit
        </button>
      </div>
      <span>{props.data.timestamp}</span>
    </div>
  );
};

export default Snippet;
