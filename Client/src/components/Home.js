import { useEffect, useState } from "react";
import "../styles/navbar.css";
import "../styles/home.css";
import Navbar from "./Navbar";
import { FaRegHeart, FaRegComment, FaHeart } from "react-icons/fa6";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { RiBookmarkLine } from "react-icons/ri";
import useFetch from "../hooks/useFetch";

const Home = () => {
    const token = localStorage.getItem("token");
    const {data:loggedUser} = useFetch('/api/user/profile', token);
    const {data:users} = useFetch('/api/user/users', token);
    const {data:posts} = useFetch('/api/posts', token);
    const [isLiked, setIsLiked] = useState(false);
    const [likedPosts, setLikedPosts] = useState({});

    const findUserById = (userId) => {
        const user = users.find(user => user._id===userId);
        return user;
    }

    const handleLike = async(post) => {

        const isLiked = post.likes.includes(loggedUser._id);
        console.log("is liked", isLiked);

        const updatePost = {
            likes: isLiked 
            ? post.likes.filter(userId => userId !== loggedUser._id) 
            : [...post.likes, loggedUser._id]
        };

        setLikedPosts(prev => ({ ...prev, [post._id]: !isLiked }));


        //const updatePost = { likes: updatedLikes };

        /*const isLiked = posts.likes?.include(loggedUser._id);
        console.log("isLiked", isLiked);*/
        //const isLikedNow = !isLiked;
        //setIsLiked(!isLikedNow);

        /*const updatePost = {
            likes: isLiked ? posts.likes.filter(userId => userId !== loggedUser._id) :[...post.likes, loggedUser._id]
        };*/
    
            try {
                const response = await fetch(`/api/posts/${post._id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(updatePost),
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                console.log("response", response);
        
                if (!response.ok) {
                    throw new Error("Failed to update selected user's followers");
                }
        
                /*const data1 = await response1.json();
                setIsLiked(isLikedNow);
                alert("liked/unliked post");*/
                const data = await response.json();
                // Update like status
                alert("Post liked/unliked successfully");
            } catch (error) {
                setLikedPosts(prev => ({ ...prev, [post._id]: !isLiked })); 
                throw Error(error);
            }
        }

    return ( 
    <div className="home">
        <Navbar />
        <div className="home-content">
            {posts &&  users && posts.map((post) => {
                const user = findUserById(post.userId);
                const isLiked = likedPosts[post._id] !== undefined 
                        ? likedPosts[post._id] 
                        : post.likes.includes(loggedUser._id);
                {/*const isLiked = post.likes?.includes(loggedUser._id);*/}
                return (
                <div className="post-container">
                    <div className="user-info">
                        <img src={user.profilePicture} />
                        <p>{user.username}</p>
                        {/*<p>{post.createdAt}</p>*/}
                    </div>
                    <div className="image-container">
                        <img key={post._id} src={`/uploads/${post.image}`}/>
                    </div>
                    <div className="description-container">
                        <div className="icons-container">
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
                            <RiBookmarkLine style={{marginLeft: '20vw', marginRight:'0px', fontSize:'24px'} }/>
                        </div>
                        <div className="likes">{post.likes.length} liked</div>
                        <div className="description">
                            <a><strong>{user.username}</strong></a>
                            <p>{post.description}</p>
                        </div>
                    </div>
                </div>
                
            )})}
        </div>
    </div> );
}

export default Home;