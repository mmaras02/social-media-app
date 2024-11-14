import "../styles/navbar.css";
import "../styles/home.css";
import Navbar from "../components/Navbar";
import useFetch from "../hooks/useFetch";
import UserInfo from "../components/UserInfo";
import CommentPost from "../components/CommentPost";
import PostActions from "../components/actions/PostActions";

const Home = () => {
    const token = localStorage.getItem("token");
    const {data:loggedUser} = useFetch('/api/user/profile', token);
    const {data:users} = useFetch('/api/user/users', token);
    const {data:posts} = useFetch('/api/posts', token);

    const findUserById = (userId) => {
        const user = users.find(user => user._id===userId);
        return user;
    }

    return ( 
    <div className="home">
        <Navbar />
        <div className="home-content">
            {posts &&  users && posts.map((post) => {
                const user = findUserById(post.userId);
                
                return (
                <div className="post-container">
                    <UserInfo user={user} />
                    <div className="image-container">
                        <img key={post._id} src={`/uploads/${post.image}`}/>
                    </div>
                    <div className="description-container" >
                        <PostActions post={post} loggedUser={loggedUser} token={token}/>
                        <div className="description">
                            <a><strong>{user.username}</strong></a>
                            <p>{post.description}</p>
                        </div>
                        <div className="comment-input home-section">
                            <CommentPost loggedUser={loggedUser} token={token} post={post}/>
                        </div>
                        
                    </div>
                </div>
                
            )})}
        </div>
    </div> );
}

export default Home;