import { useEffect, useState } from "react";
import "../styles/navbar.css";
import "../styles/home.css";
import Navbar from "./Navbar";
import { FaRegHeart, FaRegComment } from "react-icons/fa6";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { RiBookmarkLine } from "react-icons/ri";
import useFetch from "../hooks/useFetch";

const Home = () => {
    const token = localStorage.getItem("token");
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
                    <div className="user-info">
                        <img src={user.profilePicture} />
                        <p>{user.username}</p>
                        {/*<p>{post.createdAt}</p>*/}
                    </div>
                    <div className="image-container">
                        <img key={post._id} src={`/uploads/${post.image}`}/>
                    </div>
                    <div className="description-container">
                        <div className="icons-container">
                            <FaRegHeart />
                            <FaRegComment />
                            <IoPaperPlaneOutline />
                            <RiBookmarkLine style={{marginLeft: '20vw', marginRight:'0px', fontSize:'24px'} }/>
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