import { FaRegHeart, FaRegComment, FaHeart } from "react-icons/fa6";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { RiBookmarkLine } from "react-icons/ri";
import { fetchData } from "../utils/fetchData";
import { useState } from "react";

const PostActions = ({post, loggedUser, token}) => {
    const [likes, setLikes] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(post.likes.includes(loggedUser._id));

    const handleLike = async() => {
        const originalLikedState = isLiked;
        const updatedLikeState = isLiked ? likes - 1 : likes + 1; 

        setIsLiked(!isLiked);
        setLikes(updatedLikeState);

        const updatePost = {
            likes: isLiked 
            ? post.likes.filter(userId => userId !== loggedUser._id) 
            : [...post.likes, loggedUser._id]
        };

        const {data, error} = await fetchData(`/api/posts/${post._id}`, 'PATCH', token, updatePost);
        if(error){
            setIsLiked(originalLikedState);
            setLikes(likes);
            alert("Error updating like status", error);
        }
    }
    
    return ( 
        <>
        <div className="icons-container">
            <div className="like-icons-container">
                {isLiked ? (
                    <FaHeart
                    className={`icon liked`}
                    id="heart-icon"
                    onClick= {handleLike}
                    />
                ) : (
                    <FaRegHeart
                    className={`icon`}
                    id="heart-icon"
                    onClick={handleLike}
                    />
                )}
                    <FaRegComment />
                    <IoPaperPlaneOutline />
            </div>
            <div className="save-icon-container">
                <RiBookmarkLine style={{marginRight:'5px', fontSize:'24px'} }/>
            </div>
        </div>
        <div className="likes">{likes} liked</div>
        </>
     );
}
 
export default PostActions;