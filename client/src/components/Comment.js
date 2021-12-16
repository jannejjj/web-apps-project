import React from "react";
import { useState } from "react";
export const Comment = (props) => {
  const authtoken = localStorage.getItem("authtoken");
  const [editing, setEditing] = useState(0);
  const [comment, setComment] = useState("");

  // getMinutes() returns a single digit if the value is less than 0 so needs this. If getMinutes() < 10, adds a 0 in front.
  const getMinutesWithZeros = (curDate) => {
    return (curDate.getMinutes() < 10 ? "0" : "") + curDate.getMinutes();
  };

  const edit = () => {
    const id = props.id;
    const editComment = props.editComment;
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

    fetch("/api/comment/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + authtoken,
      },
      body: JSON.stringify({
        id: id,
        comment: comment,
        timestamp: timestamp,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        editComment(json);
      });
    setEditing(0);
    //window.location.reload();
  };

  // The comment is in <p> and timestamp is in <span>. Edit <button> is shown if the comment's userid is the same as the logged in user's. Furthermore, if the editing button has been toggled, the <textarea> and <button> for editing the comment are shown. When the confirmation button is pressed, edit() is run
  return (
    <div
      style={{
        backgroundColor: "#a1efff",
        width: 700,
        borderRadius: 10,
      }}
    >
      <p> {props.data.comment}</p>
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
              placeholder="Edit your comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
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

export default Comment;
