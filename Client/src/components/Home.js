import { useEffect, useState } from "react";
import "../styles/navbar.css";
import "../styles/home.css";
import Navbar from "./Navbar";
import { FaRegHeart, FaRegComment } from "react-icons/fa6";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { RiBookmarkLine } from "react-icons/ri";

const Home = () => {
    const [posts, setPosts] = useState(null);
    const [users, setUsers] = useState(null);
    const token = localStorage.getItem("token");

    //display all posts by date
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/posts',{
                headers: {
                    'Content-Type': 'application/json'
            }});
            const json = await response.json();
            console.log("Posts Response:", json); 
            if(response.ok){
                setPosts(json);
            } 
        }

        const fetchUsers = async () => {
            const response = await fetch('/api/user/users',{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
            }});
            const json = await response.json();

            if(response.ok){
                setUsers(json);
            }
        }
        
        fetchUsers();
        fetchPosts();
        
    },[token])

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
                    <div className="user-info">
                        <img src={user.profilePicture} />
                        <p>{user.username}</p>
                        
                    </div>
                    <div className="image-container">
                        <img key={post._id} src={`/uploads/${post.image}`}/>
                    </div>
                    <div className="description-container">
                        <div className="icons-container">
                            <FaRegHeart />
                            <FaRegComment />
                            <IoPaperPlaneOutline />
                            <RiBookmarkLine style={{marginLeft: '17vw', marginRight:'0px', fontSize:'35px'} }/>
                        </div>
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