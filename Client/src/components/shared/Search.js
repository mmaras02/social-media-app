import "./search.css";
import { useState } from "react";
import UserList from "../user/UserList";
import { useFeed } from "../../context/feedContext";

const Search = ({isActive}) => {
    const {users} = useFeed();
    const [searchUser, setSearchUser] = useState("");

    const foundUsers = searchUser && users?.filter((user) => user.username.toLowerCase().includes(searchUser.toLowerCase()));

    const handleSearch = (user) => {
        console.log("Search function triggered");
    }

    return ( 
        <div className="search-container">
            <div className={`search-content ${isActive ? 'active' : ''}`}>
                <div className="search-title">
                    <h2>Search</h2>
                </div>
                <div className="users-container">
                    <div className="search-users">
                        <input type="text" placeholder="Search" value={searchUser} onChange={(e) => setSearchUser(e.target.value)}/>
                    </div>
                   
                    <UserList foundUsers={foundUsers} handleUser={handleSearch} disableNavigation={false}/>
                    
                </div>
            </div>
        
        </div>
     );
}
 
export default Search;