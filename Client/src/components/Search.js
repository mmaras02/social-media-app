import NavbarShort from "./NavbarShort";
import "../styles/search.css";
import useFetch from "../hooks/useFetch";
import { useState } from "react";

const Search = () => {
    const token = localStorage.getItem("token");
    const {data:users} = useFetch('/api/user/all', token);
    const [searchUser, setSearchUser] = useState("");

    const foundUsers = searchUser && users?.filter((user) => user.username.toLowerCase().includes(searchUser.toLowerCase()));


    return ( 
        <div className="search-container">
            <NavbarShort />
            <div className="search-content">
                <div className="search-title">
                    <h2>Search</h2>
                </div>
                <div className="users-container">
                    <div className="search-users">
                        <input type="text" placeholder="Search" value={searchUser} onChange={(e) => setSearchUser(e.target.value)}/>
                    </div>
                   
                    <div className="display-users-container">
                        <h4>Recent</h4>
                        {foundUsers && foundUsers.length > 0 ? (
                            foundUsers.map((user) => 
                                <div key={user._id} className="info-contents">
                                    <img src={user.profilePicture ? user.profilePicture : '/images/profile.png'} alt="profile" />
                                    <p>{user.username}</p>
                        </div>)
                        ):(
                            <p>No users found!</p>
                        )
                    }
                    </div>
                    
                </div>
            </div>
        
        </div>
     );
}
 
export default Search;