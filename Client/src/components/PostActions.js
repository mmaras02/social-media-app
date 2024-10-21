import { FaRegHeart, FaRegComment, FaHeart } from "react-icons/fa6";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { RiBookmarkLine } from "react-icons/ri";
import { fetchData } from "../utils/fetchData";

const PostActions = ({post, loggedUser, token, likedPosts, setLikedPosts}) => {
    const isLiked = likedPosts[post._id] !== undefined 
                        ? likedPosts[post._id] 
                        : post.likes.includes(loggedUser._id);

    const handleLike = async(post) => {
        const isLiked = post.likes.includes(loggedUser._id);

        const updatePost = {
            likes: isLiked 
            ? post.likes.filter(userId => userId !== loggedUser._id) 
            : [...post.likes, loggedUser._id]
        };
        setLikedPosts(prev => ({ ...prev, [post._id]: !isLiked }));

        console.log("Posting to:", `/api/posts/${post._id}`);
        console.log("Request body:", updatePost);

        const {data, error} = await fetchData(`/api/posts/${post._id}`, 'PATCH', token, updatePost);
        if(error){
            setLikedPosts(prev => ({ ...prev, [post._id]: !isLiked }));
            alert("Error updating like status", error);
        } else {
            alert("post liked/unliked");
            console.log("Updated post data:", data);
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
                    onClick={() => handleLike(post)}
                    />
                ) : (
                    <FaRegHeart
                    className={`icon`}
                    id="heart-icon"
                    onClick={() => handleLike(post)}
                    />
                )}
                    <FaRegComment />
                    <IoPaperPlaneOutline />
            </div>
            <div className="save-icon-container">
                <RiBookmarkLine style={{marginRight:'5px', fontSize:'24px'} }/>
            </div>
        </div>
        <div className="likes">{post.likes.length} liked</div>
        </>
     );
}
 
export default PostActions;