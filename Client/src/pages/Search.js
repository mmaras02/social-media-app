import "../styles/search.css";
import useFetch from "../hooks/useFetch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import UserList from "../components/UserList";

const Search = ({isActive}) => {
    const token = localStorage.getItem("token");
    const {data:users} = useFetch('/api/user/all', token);
    const {data:loggedUser} = useFetch('/api/user/profile', token);
    const [searchUser, setSearchUser] = useState("");
    const navigate = useNavigate();

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