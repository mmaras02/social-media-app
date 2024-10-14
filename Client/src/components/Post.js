import { useNavigate, useParams, useLocation } from "react-router-dom";
import "../styles/post.css";

const Post = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();

    const post = location.state?.post;
    const user = location.state?.user;

    const handleClose = () => {
        navigate(-1);
    }
    return ( 
        <div className="modal-overlay">
            <div className="post-content">
                <div className="full-image-container">
                    <img src={`/uploads/${post.image}`} />
                </div>
            </div>

        </div>
     );
}
 
export default Post;