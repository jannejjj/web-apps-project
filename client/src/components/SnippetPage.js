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

  const [error, setError] = useState("");

  const [snippet, setSnippet] = useState({});
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

  const [comments, setComments] = useState([]);
  useEffect(() => {
    fetch("/api/comments/" + id)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.error) {
          setError(json.error);
        } else if (json.length === 0) {
          setError("No comments.");
        } else {
          setComments(json);
        }
      });
  }, [id]);

  return (
    <div style={{ paddingTop: 175 }}>
      <Snippet data={snippet} />
      {authtoken && <CommentForm snippetid={id} />}
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
          <Comment key={comment._id} data={comment} />
        ))}
      </div>
    </div>
  );
}

export default SnippetPage;
