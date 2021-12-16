import React from "react";
import { useState, useEffect } from "react";
import Error from "./Error";

export const CommentForm = ({ snippetid, addComment }) => {
  const authtoken = localStorage.getItem("authtoken");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [userid, setUserid] = useState("");

  // Gets id of currently logged in user from authtoken
  useEffect(() => {
    fetch("../users/whoami", {
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

  // getMinutes() returns a single digit if the value is less than 0 so needs this. If getMinutes() < 10, adds a 0 in front.
  const getMinutesWithZeros = (curDate) => {
    return (curDate.getMinutes() < 10 ? "0" : "") + curDate.getMinutes();
  };

  // Sends the comment, timestamp, snippetid and userid to the server.
  // When the server responds with the saved comment, calls addComment()
  // Which refreshes the comment list on the snippet page.
  const handleSubmit = (event) => {
    event.preventDefault();

    // Ugly as sin but returns date in mm.hh.dd.MM.YYYY
    const curDate = new Date();
    const timestamp =
      curDate.getHours() +
      ":" +
      getMinutesWithZeros(curDate) +
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
        userid: userid,
        snippetid: snippetid,
        comment: comment,
        timestamp: timestamp,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          setError(json.error);
        } else {
          setError("");
          addComment(json);
        }
      });
  };

  // A div containing the error container and the form for submitting a comment. The contents of the input field are saved in the comment state.
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
