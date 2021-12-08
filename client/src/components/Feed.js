import React from 'react'
import {useEffect, useState} from 'react'
import Snippet from './Snippet'
import {useNavigate} from 'react-router-dom'

function Feed() {
    const [snippets, setSnippets] = useState([])

    useEffect(() => {
        fetch('api/snippets/')
        .then(response => response.json())
        .then(json => {
            console.log(json);
            if(json.error) {
                setSnippets(json.error);
            } else {
                setSnippets(json);
            }
        })
    }, [])

    /* EI TOIMI TÄLLEEN 
    const OpenSnippetPage = (id) => {
        let navigate = useNavigate();
        navigate('/snippet/'+id)
    } */
    
    return (
        <div>
            {snippets.map((snippet) => (
                <Snippet key={snippet._id} data={snippet}/>
            ))}
        </div> 
    )
}

export default Feed
