import React from "react";
import { useState, useEffect } from "react";
import Error from "./Error";
const SnippetForm = () => {
  const [snippet, setSnippet] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [userid, setUserid] = useState("");
  const authtoken = localStorage.getItem("authtoken");

  // Get id of currently logged in user
  useEffect(() => {
    fetch("users/whoami", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + authtoken,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          console.log(json.error);
        } else {
          setUserid(json.userid);
        }
      });
  }, [authtoken]);

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
        authorization: "Bearer " + localStorage.getItem("authtoken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: userid,
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
        paddingTop: 50,
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
          <pre>
            <textarea
              placeholder="Code"
              value={snippet}
              onChange={(e) => setSnippet(e.target.value)}
              style={{
                borderRadius: 5,
                fontFamily: "Consolas",
                fontSize: 16,
              }}
            ></textarea>
          </pre>
          <input type="submit" value="Post" />
        </label>
      </form>
    </div>
  );
};

export default SnippetForm;
