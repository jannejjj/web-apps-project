import React from "react";
import { useState, useEffect } from "react";
import Error from "./Error";
const SnippetForm = () => {
  const [snippet, setSnippet] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const curDate = new Date();
    // Ugly as sin but returns date in mm.hh.dd.MM.YYYY
    const timestamp =
      curDate.getHours() +
      ":" +
      curDate.getMinutes() +
      " - " +
      curDate.getDate() +
      "." +
      (curDate.getMonth() + 1) +
      "." +
      curDate.getFullYear();

    console.log(title);
    console.log(snippet);
    console.log(timestamp);

    fetch("../api/snippet/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        snippet: snippet,
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
        paddingTop: 225,
      }}
    >
      <Error error={error} />
      <form onSubmit={handleSubmit}>
        <label style={{ fontSize: 20, color: "black" }}>
          Post a Snippet:
          <input
            placeholder="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            value={snippet}
            placeholder="Code"
            onChange={(e) => setSnippet(e.target.value)}
          />
        </label>
        <input type="submit" value="Post" />
      </form>
    </div>
  );
};

export default SnippetForm;
