import axios from "axios";
import React, { useState, useEffect } from "react";
import LoaderCom from "./LoaderCom";

function CommentsSearch() {
    const [comments, setComments] = useState([]);
    let [postId, setPostId] = useState("");
    let [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        searchData();
    }, []);

    const searchData = () => {
        setIsLoading(true);
        setErrorMsg("");
        axios
            .get("https://jsonplaceholder.typicode.com/comments", {
                params: {
                    postId,
                },
            })
            .then((result) => {
                setComments(result.data);
                setIsLoading(false);
            });
    };

    function handleInput(e) {
        setPostId(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        searchData();
        if (postId !== "" && comments.length < 1) {
            setErrorMsg(`No comments available for postid: ${postId}`);
        }
    }
    return (
        <div className="App">
            <p>Please input value</p>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleInput}></input>
                <button type="submit" value="Submit">
                    Submit
                </button>
            </form>
            {isLoading && <LoaderCom />}
            {comments.map((todo) => (
                <div key={todo.id}>{todo.body}</div>
            ))}
            {comments.length < 1 ? errorMsg : ""}
        </div>
    );
}

export default CommentsSearch;
