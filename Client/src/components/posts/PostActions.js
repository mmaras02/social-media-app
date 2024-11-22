import { FaRegHeart, FaRegComment, FaHeart } from "react-icons/fa6";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { RiBookmarkLine } from "react-icons/ri";
import { fetchData } from "../../utils/fetchData";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFeed } from "../../context/feedContext";

const PostActions = ({post, loggedUser, token}) => {
    const navigate = useNavigate();
    const [likes, setLikes] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(post.likes.includes(loggedUser?._id));
    const { findUserById, posts, updatePostInContext } = useFeed();

    useEffect(() => {
        setLikes(post.likes.length);
        setIsLiked(post.likes.includes(loggedUser?._id));
    }, [post]);


    const handleLike = async(e) => {
        e.stopPropagation();
        const originalLikedState = isLiked;
        const updatedLikeState = isLiked ? likes - 1 : likes + 1; 

        console.log("origigi ", originalLikedState);
        console.log("updated", updatedLikeState);

        setIsLiked(!isLiked);
        setLikes(updatedLikeState);

        const updatedPost = {
            likes: isLiked 
            ? post.likes.filter(userId => userId !== loggedUser?._id) 
            : [...post.likes, loggedUser?._id]
        };

        const {error} = await fetchData(`/api/posts/${post._id}`, 'PATCH', token, updatedPost);
        if(error){
            setIsLiked(originalLikedState);
            setLikes(likes);
            alert("Error updating like status", error);
        }

    }
    const handleComments = () => {
        console.log("clicked and post",post);
        const user = findUserById(post.userId)
        navigate(`/profile/post/${post._id}`, {state:{post,user:user}});
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
                    <FaRegComment onClick={handleComments}/>
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