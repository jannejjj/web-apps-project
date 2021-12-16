import React from "react";
import { useState } from "react";

export const Snippet = (props) => {
  const [editing, setEditing] = useState(0);
  const [snippet, setSnippet] = useState("");
  const authtoken = localStorage.getItem("authtoken");

  // getMinutes() returns a single digit if the value is less than 0 so needs this. If getMinutes() < 10, adds a 0 in front.
  const getMinutesWithZeros = (curDate) => {
    return (curDate.getMinutes() < 10 ? "0" : "") + curDate.getMinutes();
  };

  const edit = () => {
    const id = props.id;

    // Ugly as sin but returns date in mm.hh.dd.MM.YYYY
    const curDate = new Date();
    const timestamp =
      curDate.getHours() +
      ":" +
      getMinutesWithZeros(curDate) +
      " - " +
      curDate.getDate() +
      "." +
      (curDate.getMonth() + 1) + // +1 since months run from 0 to 11
      "." +
      curDate.getFullYear();

    fetch("/api/snippet/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + authtoken,
      },
      body: JSON.stringify({
        id: id,
        snippet: snippet,
        timestamp: timestamp,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json.message);
      });
    setEditing(0);
    window.location.reload();
  };

  // Snippet title is in <p>, code is in <code> and timestamp is in <span>. Edit <button> is shown if the snippet's userid is the same as the logged in user's. Furthermore, if the editing button has been toggled, the <textarea> and <button> for editing the snippet are shown. When the confirmation button is pressed, edit() is run.
  return (
    <div
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
        <code onClick={props.onClick}> {props.data.snippet}</code>
      </pre>
      <div>
        {props.loggedUser === props.userid && (
          <button
            onClick={() => {
              editing ? setEditing(0) : setEditing(1);
            }}
            style={{ margin: 6 }}
          >
            Edit
          </button>
        )}
        {editing === 1 && (
          <div>
            <textarea
              placeholder="Edit your snippet"
              value={snippet}
              onChange={(e) => setSnippet(e.target.value)}
              style={{
                borderRadius: 5,
                fontSize: 16,
                backgroundColor: "white",
              }}
            ></textarea>
            <button onClick={edit}>Confirm edit</button>
          </div>
        )}
      </div>
      <span>{props.data.timestamp}</span>
    </div>
  );
};

export default Snippet;
