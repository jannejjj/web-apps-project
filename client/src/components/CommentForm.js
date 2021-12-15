import React from "react";
import { useState } from "react";
import Error from "./Error";

export const CommentForm = ({ snippetid }) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Ugly as sin but returns date in mm.hh.dd.MM.YYYY
    const curDate = new Date();
    const timestamp =
      curDate.getHours() +
      ":" +
      curDate.getMinutes() +
      " - " +
      curDate.getDate() +
      "." +
      (curDate.getMonth() + 1) + // +1 since months run 0 to 11
      "." +
      curDate.getFullYear();

    fetch("../api/comment/", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("authtoken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        snippetid: snippetid,
        comment: comment,
        timestamp: timestamp,
        upvotes: 0,
        downvotes: 0,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          setError(json.error);
        } else {
          setError("");
        }
      });
  };

  return (
    <div
      style={{
        margin: "auto",
        width: 700,
        paddingTop: 50,
      }}
    >
      <Error error={error} />
      <form onSubmit={handleSubmit}>
        <label style={{ fontSize: 20, color: "black" }}>
          Post a Comment:
          <input
            type="text"
            value={comment}
            placeholder="Type here..."
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
        <input type="submit" value="Post" />
      </form>
    </div>
  );
};

export default CommentForm;
