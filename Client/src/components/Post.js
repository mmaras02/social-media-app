import { useNavigate, useParams, useLocation } from "react-router-dom";
import "../styles/post.css";
import "../styles/home.css";
import { fetchData } from "../utils/fetchData";
import PostActions from "./PostActions";
import UserInfo from "./UserInfo";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import useFetch from "../hooks/useFetch";
import CommentPost from "./CommentPost";

const Post = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem("token");
    const {data:users} = useFetch('/api/user/users','GET', token);

    const loggedUser = location.state?.loggedUser;
    const post = location.state?.post;
    const user = location.state?.user;

    const onClose = () => {
        navigate(-1);
    }

    const handleDelete = async(postId) => {
      const {data, error} = await fetchData(`/api/posts/${postId}`, 'DELETE', token);
        if(error){
            alert("Error updating follows status", error);
        }
        else{
          alert("post deleted");
        }
    }
    const findUserById = (userId) => {
        const user = users.find(user => user._id===userId);
        return user;
    }

    return ( 
        <div className="modal-overlay">
            <div className="post-content">
                <div className="full-image-container">
                    <img className="post-image" src={`/uploads/${post.image}`} />
                </div>
                <div className="upload-description-container">
                    <div className="info-contents">
                    <UserInfo 
                          user={user} 
                          showDots={true} 
                          onDotsClick={() => handleDelete(post._id)}
                      />
                    </div>
    
                    <div className="comment-section-container">
                        <div className="info-contents">
                        <UserInfo 
                              user={user} 
                              description={post.description}
                          />
                          <IoMdClose onClick={onClose} style={{fontSize: '25px'}}/>
                        </div>
                       {users && post.comments.map((comment, index) => {
                        const commentUser = findUserById(comment.userId);
                        return (
                            <div className="display-comments-container">
                                <UserInfo user={commentUser} description={comment.text}/>
                            </div>
                       )}

                       )}
                    </div>
                    <PostActions post={post} 
                                loggedUser={user} 
                                token={token}
                                />
                    <div className="liked">{post?.likes > 0 ? `${post.likes} likes` : ''}</div>
                    <div className="comment-input post-section">
                        <CommentPost loggedUser={loggedUser} token={token} post={post}/>
                    </div>
                    
                </div>
            </div>

        </div>
     );
}
 
export default Post;