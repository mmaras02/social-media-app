import { useState } from "react";
import InputAction from "./InputAction";
import { fetchData } from "../../utils/fetchData";

const CommentPost = ({loggedUser, token, post, updateComments}) => {
    const [comment, setComment] = useState("");

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
            console.log("Comment successfully saved:", data.comments);
            alert("Comment added!");
            updateComments(data.comments);
        }

        setComment("");
    }

    return ( 
        <InputAction className={"write-comment home-page"} 
                    text={comment}
                    onTextChange={setComment}
                    handleText={() => submitComment(post)}
                    placeholder={"Write a comment..."}
                    buttonLabel={"post"}/>
      
     );
}
 
export default CommentPost;