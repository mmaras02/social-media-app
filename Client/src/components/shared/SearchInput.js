import "./search.css";
import { useState } from "react";
import UserList from "../user/UserList";
import { useFeed } from "../../context/feedContext";

const SearchInput = ({foundUsers, handleUser, disableNavigation}) => {
    const {users} = useFeed();
    const [searchUser, setSearchUser] = useState("");

    const filterUser = searchUser ? users?.filter((user) => user.username.toLowerCase().includes(searchUser.toLowerCase())) : foundUsers;

    return (
        <div className="users-container">
            <div className="search-users">
                <input type="text" placeholder="Search" value={searchUser} onChange={(e) => setSearchUser(e.target.value)}/>
            </div>
            
            <UserList foundUsers={filterUser} handleUser={handleUser} disableNavigation={disableNavigation}/>
            
        </div>
     );
}
 
export default SearchInput;