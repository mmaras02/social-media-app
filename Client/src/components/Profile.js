import { useState, useEffect } from "react";
import "../styles/profile.css";
import Navbar from "./Navbar";
import { IoSettingsOutline } from "react-icons/io5";
import useFetch from "../hooks/useFetch";

const Profile = () => {
    const token = localStorage.getItem("token");
    const {data:user} = useFetch('/api/user/profile', token);
    const {data:posts} = useFetch('/api/posts', token);

    return ( 
        <div className="profile">
            <Navbar />
            <div className="profile-content">
                <div className="user-profile">
                    {user && (
                    <div className="profile-header">
                        <div className="profile-info">
                            <div className="photo-container">
                                <img src={user.profilePicture || "/images/profile.jpeg" }/>
                            </div>
                            <div className="info-content">
                                <div className="first">
                                    <p>{user.username}</p>
                                    <div className="action-buttons">
                                        <button className="action">Edit profile</button>
                                        <button className="action">View archive</button>
                                    </div>
                                    <div className="settings">
                                        <IoSettingsOutline size={25}/>
                                    </div>
                                </div>

                                <div className="data-content">
                                    <div className="posts">0 posts</div>
                                    <div className="posts">{user.followers ? Number(user.followers) : 0} followers</div>
                                    <div className="posts">{user.following ? Number(user.following) : 0} following</div>
                                </div>
                            </div>

                        </div>
                    </div>
                    )}
                    <div className="user-post-container">
                    {posts && user && posts.filter(post => post.userId === user._id).map((post) => (
                            <div className="user-image-container">
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