import React from "react";
import { useEffect, useState } from "react";
import Snippet from "./Snippet";
import Error from "./Error";
import { useNavigate } from "react-router-dom";

function Feed() {
  const [snippets, setSnippets] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("api/snippets/")
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          setSnippets(json.error);
        } else if (json.length === 0) {
          setError("Not a single Snippet has been posted yet!");
        } else {
          setSnippets(json);
        }
      });
  }, []);

  const navigate = useNavigate();

  return (
    <div style={{ marginTop: 30 }}>
      <Error error={error} />
      {snippets.map((snippet) => (
        <Snippet
          key={snippet._id}
          data={snippet}
          onClick={() => navigate("/snippet/" + snippet._id)}
        />
      ))}
    </div>
  );
}

export default Feed;
