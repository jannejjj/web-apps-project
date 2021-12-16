import React from "react";
import { useEffect, useState } from "react";
import Snippet from "./Snippet";
import Error from "./Error";
import { useNavigate } from "react-router-dom";
import SnippetForm from "./SnippetForm";

function Feed() {
  const authtoken = localStorage.getItem("authtoken");
  const [snippets, setSnippets] = useState([]);
  const [error, setError] = useState("");
  const [userid, setUserid] = useState("");

  const addSnippet = (newSnippet) => {
    setSnippets((snippets) => [...snippets, newSnippet]);
    setError("");
  };

  const editSnippet = (editedSnippet) => {
    const newSnippets = snippets.map((snippet) => {
      if (snippet._id === editedSnippet._id) {
        return editedSnippet;
      } else {
        return snippet;
      }
    });
    setSnippets(newSnippets);
  };

  useEffect(() => {
    fetch("api/snippets/")
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          setError(json.error);
        } else if (json.length === 0) {
          setError("Not a single Snippet has been posted yet!");
        } else {
          setSnippets(json);
        }
      });
  }, []);

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
          localStorage.removeItem("authtoken"); // if token is expired
        } else {
          setUserid(json.userid);
        }
      });
  }, [authtoken]);

  const navigate = useNavigate();

  return (
    <div
      style={{
        marginTop: 30,
        paddingTop: 175,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {authtoken && <SnippetForm addSnippet={addSnippet} />}
      <Error error={error} />
      {snippets.map((snippet) => (
        <Snippet
          editSnippet={editSnippet}
          addSnippet={addSnippet}
          loggedUser={userid}
          userid={snippet.userid}
          key={snippet._id}
          id={snippet._id}
          data={snippet}
          onClick={() => navigate("/snippet/" + snippet._id)}
        />
      ))}
    </div>
  );
}

export default Feed;
