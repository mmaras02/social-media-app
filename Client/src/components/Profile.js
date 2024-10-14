import { useState, useRef  } from "react";
import "../styles/profile.css";
import Navbar from "./Navbar";
import { IoSettingsOutline } from "react-icons/io5";
import useFetch from "../hooks/useFetch";
import EditProfile from "./EditProfile";
import { useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";

const Profile = () => {
    const token = localStorage.getItem("token");
    const {data:user} = useFetch('/api/user/profile', token);
    const {data:posts} = useFetch('/api/posts', token);
    const navigate = useNavigate();

    const handleEditProfile = () => {
        //<EditProfile user={user}/>
        navigate('/edit', { state: {user}});
    }

    const handlePost = (post, user) => {
        navigate(`/profile/post/${post._id}`, {state: {post: post, user: user}});
    }

    return ( 
        <div className="profile">
            <Navbar />
            <div className="profile-content">
                <div className="user-profile">
                    {user && (
                    <div className="profile-header">
                        <div className="profile-info">
                            <div className="photo-container">
                                <img src={user.profilePicture ? user.profilePicture : '/images/profile.png' } />
                                <input type="file" accept="image/*" style={{ display: "none" }} />
                            </div>
                            <div className="info-content">
                                <div className="first">
                                    <p>{user.username}</p>
                                    <div className="action-buttons">
                                        <button className="action" onClick={handleEditProfile}>Edit profile</button>
                                        <button className="action">View archive</button>
                                    </div>
                                    <div className="settings">
                                        <IoSettingsOutline size={25}/>
                                    </div>
                                </div>

                                <div className="data-content">
                                    <li className="posts">0 posts</li>
                                    <li className="posts">{user.followers ? Number(user.followers) : 0} followers</li>
                                    <li className="posts">{user.following ? Number(user.following) : 0} following</li>
                                </div>
                                <div className="bio-content">
                                    <p>{user.bio}</p>
                                </div>
                            </div>

                        </div>

                        <div className="add-stories-container">
                            <div className="add-story">
                                <GoPlus style={{fontSize:'60px', color:'rgba(209, 189, 189, 0.5)'}}/>
                            </div>
                        </div>

                    </div>
                    )}
                    <div className="user-post-container">
                    {posts && user && posts.filter(post => post.userId === user._id).map((post) => (
                            <div className="user-image-container" key={post._id} onClick={() => handlePost(post, user)}>
                                <img src={`/uploads/${post.image}`} />
                            </div>
                    ))}
                    </div>
                </div>
                
            </div>
        </div>
     );
}
 
export default Profile;