import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Navbar from "./Navbar";
import Profile from "./Profile";
import { useEffect, useState } from "react";

const ProfilePage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const { data: loggedUser} = useFetch('/api/user/profile', token);
    const { data: posts} = useFetch('/api/posts', token);
    const { data: allUsers} = useFetch('/api/user/all', token);
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

    console.log("set user is", user);

    const handleEditProfile = () => {
        navigate('/edit', { state: {user}});
    }

    const handlePost = (post, user) => {
        navigate(`/profile/post/${post._id}`, {state: {post: post, user: user}});
    }

        //loggedUser.following+1;
        //selectedUser.followers+1
    const handleFollow = async(e) => {
        e.preventDefault();
        const isFollowingNow = isFollowing;
    
    // Update the UI immediately
        setIsFollowing(!isFollowingNow);

        if(!isFollowing){
            const updateSearchedUser = {
                followers: selectedUser.followers ? [...selectedUser.followers, loggedUser._id] : [loggedUser._id]
            };
        
            const updateLoggedUser = {
                following: loggedUser.following ? [...loggedUser.following, selectedUser._id] : [selectedUser._id]
            };
        
            try {
                // Update selectedUser's followers
                const response1 = await fetch(`/api/user/${selectedUser._id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(updateSearchedUser),
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
        
                if (!response1.ok) {
                    throw new Error("Failed to update selected user's followers");
                }
        
                const data1 = await response1.json();
                console.log("Updated selected user followers", data1);
        
                // Update loggedUser's following
                const response2 = await fetch(`/api/user/${loggedUser._id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(updateLoggedUser),
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
        
                if (!response2.ok) {
                    throw new Error("Failed to update logged-in user's following");
                }
        
                const data2 = await response2.json();
                console.log("Updated logged-in user's following", data2);
        
                // Both updates succeeded, update the local state
                setSelectedUser((prevSelectedUser) => ({
                    ...prevSelectedUser,
                    followers: updateSearchedUser.followers
                }));
        
                setUser((prevUser) => ({
                    ...prevUser,
                    following: updateLoggedUser.following
                }));
        
                alert("Successfully followed the user!");
        
            } catch (error) {
                console.error("Error updating follow status", error);
                alert("Something went wrong while following the user");
            }
        } else{
            const updateSearchedUser = {
                followers: selectedUser.followers.filter(followerId => followerId !== loggedUser._id)
            };
        
            const updateLoggedUser = {
                following: loggedUser.following.filter(followingId => followingId !== selectedUser._id )
            };
        
            try {
                // Update selectedUser's followers
                const response1 = await fetch(`/api/user/${selectedUser._id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(updateSearchedUser),
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
        
                if (!response1.ok) {
                    throw new Error("Failed to update selected user's followers");
                }
        
                const data1 = await response1.json();
                console.log("Updated selected user followers", data1);
        
                // Update loggedUser's following
                const response2 = await fetch(`/api/user/${loggedUser._id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(updateLoggedUser),
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
        
                if (!response2.ok) {
                    throw new Error("Failed to update logged-in user's following");
                }
        
                const data2 = await response2.json();
                console.log("Updated logged-in user's following", data2);
        
                // Both updates succeeded, update the local state
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
        
            } catch (error) {
                console.error("Error updating follow status", error);
                alert("Something went wrong while following the user");
            }

        }

    }

    return ( 
        <div className="profile">
            <Navbar />
            <div className="profile-content">
                {user && <Profile user={user} isLoggedUser={!username} posts={posts} isFollowing={isFollowing} handleFollow={handleFollow} handleEditProfile={handleEditProfile} handlePost={handlePost}/>}
            </div>
        </div>
     );
}
 
export default ProfilePage;