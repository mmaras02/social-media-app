import { IoSettingsOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";

const Profile = ({user, isLoggedUser, posts, isFollowing, handleFollow, handleEditProfile, handlePost}) => {

    return ( 
        <div className="user-profile">
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
                                {isLoggedUser ? (
                                    <>
                                        <button className="action" onClick={handleEditProfile}>Edit profile</button>
                                        <button className="action">View archive</button>
                                    </> 
                                ):(
                                    <>
                                        <button 
                                            className={`action ${isFollowing ? "following" : ""}`}
                                            onClick={handleFollow}
                                        >
                                            {isFollowing ? "Following" : "Follow"}
                                        </button>
                                        <button className="action">Message</button>
                                    </>

                                )}
                                
                            </div>
                            <div className="settings">
                                <IoSettingsOutline size={25}/>
                            </div>
                        </div>

                        <div className="data-content">
                            <li className="posts">{posts?.filter(post => post.userId === user._id).length} posts</li>
                            <li className="posts">{user.followers ? user.followers.length : 0} followers</li>
                            <li className="posts">{user.following ? user.following.length : 0} following</li>
                        </div>
                        <div className="bio-content">
                            <p>{user.bio}</p>
                        </div>
                    </div>
                </div>
                {isLoggedUser ? (
                        <div className="add-stories-container logged-user">
                            <div className="add-story">
                                <GoPlus style={{fontSize:'60px', color:'rgba(209, 189, 189, 0.5)'}}/>
                            </div>
                        </div>
                    ):(
                        <div className="add-stories-container searched-user">
                            <div className="user-story">
                            </div>
                        </div>
                    )}
            </div>

            <div className="user-post-container">
                {posts && user && posts.filter(post => post.userId === user._id).map((post) => (
                        <div className="user-image-container" key={post._id} onClick={() => handlePost(post, user)}>
                            <img src={`/uploads/${post.image}`} />
                        </div>
                ))}
            </div>
        </div>
        
     );
}
 
export default Profile;