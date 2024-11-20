import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/shared/Navbar";
import Profile from "../../components/user/Profile";
import { fetchData } from "../../utils/fetchData";
import "./profile.css";
import { useFeed } from "../../context/feedContext";
import { useAuth } from "../../context/authContext";

const ProfilePage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const { username } = useParams();
    const {posts, users: allUsers} = useFeed();
    const {user: loggedUser} = useAuth();

    const [user, setUser] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    
   useEffect(() => {
        if (username && allUsers) {
            const foundUser = allUsers.find(user => user.username.toLowerCase() === username.toLowerCase());
            setSelectedUser(foundUser);
            setUser(foundUser);
            setIsFollowing(foundUser?.followers?.includes(loggedUser._id));
        } else if (loggedUser) {
            setUser(loggedUser);
        }
    }, [username, allUsers, loggedUser]);

    const handleEditProfile = () => {
        navigate('/edit', { state: { user }});
    }

    const handlePost = (post, user) => {
        navigate(`/profile/post/${post._id}`, {state: {post: post, user: user, loggedUser: loggedUser}});
    }

    const handleFollow = async(e) => {
        e.preventDefault();
        
        const isFollowingNow = isFollowing;
        setIsFollowing(!isFollowingNow);

        if(!isFollowing){
            const updateSearchedUser = {
                followers: selectedUser.followers ? [...selectedUser.followers, loggedUser._id] : [loggedUser._id]
            };
        
            const updateLoggedUser = {
                following: loggedUser.following ? [...loggedUser.following, selectedUser._id] : [selectedUser._id]
            };

            await fetchData(`/api/user/${selectedUser._id}`, 'PATCH', token, updateSearchedUser);
            await fetchData(`/api/user/${loggedUser._id}`, 'PATCH', token, updateLoggedUser);
    
            setUser((prevUser) => ({
                ...prevUser,
                followers: updateSearchedUser.followers
            }));

        } else{
            const updateSearchedUser = {
                followers: selectedUser.followers.filter(followerId => followerId !== loggedUser._id)
            };
        
            const updateLoggedUser = {
                following: loggedUser.following.filter(followingId => followingId !== selectedUser._id )
            };
        
            await fetchData(`/api/user/${selectedUser._id}`, 'PATCH', token, updateSearchedUser);
            await fetchData(`/api/user/${loggedUser._id}`, 'PATCH', token, updateLoggedUser);

            setUser((prevUser) => ({
                ...prevUser,
                followers: updateSearchedUser.followers
            }));

            setIsFollowing(false);
            alert("Successfully unfollowed the user!");
        }
    }

    return ( 
        <div className="profile">
            <Navbar />
            <div className="profile-content">
                {user && <Profile 
                            user={user} 
                            isLoggedUser={!username}
                            posts={posts} 
                            isFollowing={isFollowing} 
                            handleFollow={handleFollow} 
                            handleEditProfile={handleEditProfile} 
                            handlePost={handlePost}
                            />}
            </div>
        </div>
     );
}
 
export default ProfilePage;