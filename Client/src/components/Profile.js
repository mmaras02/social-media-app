import { useState, useEffect } from "react";
import "../styles/profile.css";
import Navbar from "./Navbar";
import { IoSettingsOutline } from "react-icons/io5";

const Profile = () => {
    const [posts, setPosts] = useState(null);
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchUser = async () => {
            if(!token){
                throw Error("There is no token in local storage");
            }
            try{
            const response = await fetch('/api/user/profile',{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
            }})
            const json = await response.json();

            if(response.ok){
                setUser(json);
            }
            else{
                throw Error(json.error);
            }
        }catch(error){
            throw Error(error);
        }
        }
        fetchUser();
    },[token])

    return ( 
        <div className="profile">
            <Navbar />
            <div className="profile-content">
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
            </div>
        </div>
     );
}
 
export default Profile;