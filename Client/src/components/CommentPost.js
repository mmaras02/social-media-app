import { fetchData } from "../utils/fetchData";
import { useState } from "react";
import "../styles/home.css";

const CommentPost = ({loggedUser, token, post}) => {
    const [comment, setComment] = useState("");
    const [showPostButton, setShowPostButton] = useState(false);

    const handleComment = (e) => {
        setComment(e.target.value);
        setShowPostButton(e.target.value.length > 0); 
    }
    const submitComment = async(post) => {
        const newComment = {
            text: comment,
            userId: loggedUser._id,
        };
 
        const {data, error} = await fetchData(`/api/posts/comment/${post._id}`, 'PATCH', token, newComment);
        if (error) {
            console.error("Error saving comment:", error);
            alert("Error saving comment");
        } else {
            console.log("Comment successfully saved:", data);
            alert("Comment added!");
        }

        setComment("");
        setShowPostButton(false);
    }

    return ( 
        <>
        <input className="write-comment home-page" placeholder="Write a comment" type="text" value={comment} onChange={handleComment} />
            {showPostButton && (
                <button className="action-button post-button" onClick={() => submitComment(post)}>post</button>
            )}
        </>
     );
}
 
export default CommentPost;