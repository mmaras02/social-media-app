import "./home.css";
import Navbar from "../../components/shared/Navbar";
import UserInfo from "../../components/user/UserInfo";
import PostActions from "../../components/posts/PostActions";
import { useAuth } from "../../context/authContext";
import { useFeed } from "../../context/feedContext";
import CommentPost from "../../components/posts/CommentPost";
import { useState } from "react";
import HomeHeader from "./HomeHeader";

const Home = () => {
    const token = localStorage.getItem("token");
    const {user: loggedUser} = useAuth();
    const {posts, users, findUserById, getPostsByFollowedUsers} = useFeed();
    const [currentView, setCurrentView] = useState("following");
    const [isFollowingView, setIsFollowingView] = useState(true);

    const filteredPosts =
        currentView === "following" ? getPostsByFollowedUsers(loggedUser) : posts;

    return ( 
    <div className="home">
        <Navbar />
        <div className="home-content">
            <HomeHeader currentView={currentView} setCurrentView={setCurrentView}/>
            
            {filteredPosts && users && filteredPosts.map((post) => {
                const user = findUserById(post.userId);
                
                return (
                <div className="post-container">
                    <UserInfo user={user} />
                    <div className="image-container">
                        <img key={post._id} src={`/uploads/${post.image}`}/>
                    </div>
                    
                    <div className="description-container" >
                        <PostActions post={post} 
                                     loggedUser={loggedUser}
                                    token={token}/>

                        <div className="description">
                            <a><strong>{user.username}</strong></a>
                            <p>{post.description}</p>
                        </div>

                        <div className="comment-input home-section">
                            <CommentPost loggedUser={loggedUser}
                                         token={token} 
                                         post={post}/>
                        </div>
                        
                    </div>
                </div>
                
            )})}
        </div>
    </div> );
}

export default Home;