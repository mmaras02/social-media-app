import { useNavigate, useLocation } from "react-router-dom";
import "./post.css";
import UserInfo from "../user/UserInfo";
import { IoMdClose } from "react-icons/io";
import CommentPost from "./CommentPost";
import PostActions from "./PostActions";
import { useFeed } from "../../context/feedContext";
import { useAuth } from "../../context/authContext";
import { useState } from "react";

const Post = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem("token");
    const {user: loggedUser} = useAuth();
    const { users, deletePost, findUserById } = useFeed();

    const post = location.state?.post;
    const user = location.state?.user;
    const [comments, setComments] = useState(post.comments || []);

    const onClose = (e) => {
        if (!e.target.closest(".post-content")) {
            e.preventDefault();
            navigate(-1);
        }
    }

    return ( 
        <div onClick={onClose}>
        <div className="modal-overlay">
            <div className="post-content">
                <div className="full-image-container">
                    <img className="post-image" src={`/uploads/${post.image}`} />
                </div>
                <div className="upload-description-container">
                    <div className="info-contents">
                    <UserInfo 
                          user={user} 
                          showDeleteButton={post.userId === loggedUser?._id} 
                          onDeleteButton={() => {
                            if (loggedUser?._id === post.userId) {
                                deletePost(post._id);
                            }}}
                      />
                    </div>
    
                    <div className="comment-section-container">
                        <div className="info-contents">
                            <UserInfo 
                                user={user} 
                                description={post.description}
                            />
                        </div>

                       {users && comments.map((comment) => {
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
                        <CommentPost loggedUser={loggedUser} 
                                     token={token}
                                     post={post}
                                    updateComments={setComments}/>
                    </div>
                    
                </div>
            </div>

        </div>

        </div>
     );
}
 
export default Post;