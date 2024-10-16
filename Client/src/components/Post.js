import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FaRegHeart, FaRegComment } from "react-icons/fa6";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { RiBookmarkLine } from "react-icons/ri";
import { HiDotsHorizontal } from "react-icons/hi";
import "../styles/post.css";

const Post = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const token = localStorage.getItem("token");

    const post = location.state?.post;
    const user = location.state?.user;

    const handleClose = () => {
        navigate(-1);
    }

    const handleDelete = async(postId) => {
        try {
            const response = await fetch(`/api/posts/${postId}`, {
              method: "DELETE",
              headers: {
                'Authorization': `Bearer ${token}`,
              }
            });
            const json = await response.json();
            console.log(json);
      
            if (response.ok) {
              alert("Post deleted!");
            } else {
              throw Error("something went wrong");
            }
          } catch (error) {
            console.log("Error submitting the form", error);
          }
    }
    return ( 
        <div className="modal-overlay" onClick={handleClose}>
            <div className="post-content">
                <div className="full-image-container">
                    <img className="post-image" src={`/uploads/${post.image}`} />
                </div>
                <div className="upload-description-container">
                    <div className="info-contents">
                      <img src={user.profilePicture ? user.profilePicture : '/images/profile.png'} alt="profile" />
                      <p>{user.username}</p>
                      <HiDotsHorizontal style={{marginLeft:'200px', fontSize:'25px'}} onClick={() => handleDelete(post._id)}/>
                    </div>
                    <div className="comment-section-container">
                        <div className="info-contents">
                        <img src={user.profilePicture ? user.profilePicture : '/images/profile.png'} alt="profile" />
                        <p>{user.username}</p>
                        <a>{post.description}</a>
                        </div>
                    </div>
                    <div className="icons-container">
                        <FaRegHeart />
                        <FaRegComment />
                        <IoPaperPlaneOutline />
                        <RiBookmarkLine style={{marginLeft: '15vw', marginRight:'0px', fontSize:'24px'} }/>
                    </div>
                    <div className="liked">{post?.likes > 0 ? `${post.likes} likes` : ''}</div>
                    <input className="write-comment" placeholder="Add a comment" ></input>
                    
                </div>
            </div>

        </div>
     );
}
 
export default Post;