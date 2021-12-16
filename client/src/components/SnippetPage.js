import Snippet from "./Snippet";
import Comment from "./Comment";
import Error from "./Error";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentForm from "./CommentForm";

function SnippetPage() {
  const authtoken = localStorage.getItem("authtoken");
  const { id } = useParams();

  const [userid, setUserid] = useState("");
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);
  const [snippet, setSnippet] = useState({});

  // Refreshes the comment list to include the new comment
  const addComment = (newComment) => {
    setComments((comments) => [...comments, newComment]);
    setError("");
  };

  // Refreshes the comment list to include the edited comment in the same place as it was previously
  const editComment = (editedComment) => {
    const newComments = comments.map((comment) => {
      if (comment._id === editedComment._id) {
        return editedComment;
      } else {
        return comment;
      }
    });
    setComments(newComments);
  };

  const editSnippet = (editedSnippet) => {
    setSnippet(editedSnippet);
  };

  // Fetch the snippet
  useEffect(() => {
    fetch("../api/snippet/" + id)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.error) {
          console.log(json.error);
        } else {
          setSnippet(json);
        }
      });
  }, [id]);

  // Fetch comments for the snippet
  useEffect(() => {
    fetch("/api/comments/" + id)
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          setError(json.error);
        } else if (json.length === 0) {
          setError("No comments.");
        } else {
          setComments(json);
        }
      });
  }, [id]);

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
          localStorage.removeItem("authtoken"); // if token is expired
        } else {
          setUserid(json.userid);
        }
      });
  }, [authtoken]);

  // A div with the snippet, a form for commenting, an error container and the snippet's comments
  return (
    <div style={{ paddingTop: 175 }}>
      <Snippet
        editSnippet={editSnippet}
        loggedUser={userid}
        userid={snippet.userid}
        key={snippet._id}
        id={snippet._id}
        data={snippet}
      />

      {authtoken && <CommentForm snippetid={id} addComment={addComment} />}
      <h3 style={{ fontSize: 30 }}>Comments:</h3>
      <Error error={error} />
      <div
        style={{
          align: "center",
          margin: "auto",
          width: 700,
          borderRadius: 10,
        }}
      >
        {comments.map((comment) => (
          <Comment
            editComment={editComment}
            addComment={addComment}
            key={comment._id}
            id={comment._id}
            loggedUser={userid}
            userid={comment.userid}
            data={comment}
          />
        ))}
      </div>
    </div>
  );
}

export default SnippetPage;
