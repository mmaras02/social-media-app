import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Navbar from "../components/Navbar";
import Profile from "../components/Profile";
import { useEffect, useState } from "react";
import { fetchData } from "../utils/fetchData";

const ProfilePage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    
    const { data: loggedUser} = useFetch('/api/user/profile', token);
    const { data: posts} = useFetch('/api/posts', token);
    const { data: allUsers} = useFetch('/api/user/all', token);

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
        navigate('/edit', { state: {user}});
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

            const {data, error} = await fetchData(`/api/user/${selectedUser._id}`, 'PATCH', token, updateSearchedUser);
            if(error){
                alert("Error updating follows status", error);
            }

            const {data1, error1} = await fetchData(`/api/user/${loggedUser._id}`, 'PATCH', token, updateLoggedUser);
            if(error1){
                alert("Error updating following status", error);
            } else

            setSelectedUser((prevSelectedUser) => ({
                ...prevSelectedUser,
                followers: updateSearchedUser.followers
            }));
    
            setUser((prevUser) => ({
                ...prevUser,
                following: updateLoggedUser.following
            }));

        } else{
            const updateSearchedUser = {
                followers: selectedUser.followers.filter(followerId => followerId !== loggedUser._id)
            };
        
            const updateLoggedUser = {
                following: loggedUser.following.filter(followingId => followingId !== selectedUser._id )
            };
        
            const {data, error} = await fetchData(`/api/user/${selectedUser._id}`, 'PATCH', token, updateSearchedUser);
            if(error){
                alert("Error updating follows status", error);
            }

            const {data1, error1} = await fetchData(`/api/user/${loggedUser._id}`, 'PATCH', token, updateLoggedUser);
            if(error1){
                alert("Error updating following status", error);
            }

            setSelectedUser((prevSelectedUser) => ({
                ...prevSelectedUser,
                followers: updateSearchedUser.followers
            }));
    
            setUser((prevUser) => ({
                ...prevUser,
                following: updateLoggedUser.following
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