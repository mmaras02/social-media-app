import { useEffect, useState } from "react";
import "../styles/navbar.css";
import "../styles/home.css";
import Navbar from "./Navbar";
import useFetch from "../hooks/useFetch";
import PostActions from "./PostActions";
import UserInfo from "./UserInfo";
import { fetchData } from "../utils/fetchData";

const Home = () => {
    const token = localStorage.getItem("token");
    const {data:loggedUser} = useFetch('/api/user/profile','GET', token);
    const {data:users} = useFetch('/api/user/users','GET', token);
    const {data:posts} = useFetch('/api/posts','GET', token);
    const [likedPosts, setLikedPosts] = useState({});
    const [comment, setComment] = useState("");
    const [showPostButton, setShowPostButton] = useState(false);

    const findUserById = (userId) => {
        const user = users.find(user => user._id===userId);
        return user;
    }

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
    <div className="home">
        <Navbar />
        <div className="home-content">
            {posts &&  users && posts.map((post) => {
                const user = findUserById(post.userId);
                
                return (
                <div className="post-container">
                    <UserInfo user={user} />
                    <div className="image-container">
                        <img key={post._id} src={`/uploads/${post.image}`}/>
                    </div>
                    <div className="description-container" >
                        <PostActions post={post} loggedUser={loggedUser} token={token} likedPosts={likedPosts} setLikedPosts={setLikedPosts}/>
                        <div className="description">
                            <a><strong>{user.username}</strong></a>
                            <p>{post.description}</p>
                        </div>
                        <div className="comment-input">
                            <input className="write-comment home-page" placeholder="Write a comment" type="text" value={comment} onChange={handleComment} />
                            {showPostButton && (
                                <button className="action-button post-button" onClick={() => submitComment(post)}>post</button>
                            )}
                        </div>
                        
                    </div>
                </div>
                
            )})}
        </div>
    </div> );
}

export default Home;