import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/messages.css";
import "../styles/editProfile.css";
import useFetch from "../hooks/useFetch";
import UserInfo from "../components/UserInfo";
import UserList from "../components/UserList";

const Messages = () => {
    const token = localStorage.getItem("token");
    const {data:users} = useFetch('/api/user/all','GET', token);
    const {data:loggedUser} = useFetch('/api/user/profile','GET', token);

    const foundUsers = users && loggedUser?.following?.length ? users.filter(user => loggedUser.following.includes(user._id)) : []; 
    console.log("foundusers", foundUsers);

    const handleMessage = () => {
        
    }

    return (
        <div className="messages-container">
            <Navbar isShort={true}/>
            <div className="messages-content">
                <div className="all-settings-container messages">
                    <div className="search-title">
                        <h2>Message</h2>
                    </div>
                    <UserList foundUsers={foundUsers} handleUser={handleMessage} />
                </div>
                <div className="write-messages-content">
                    <img src="/images/messagesIcon.png" />
                    <h3>Your messages</h3>
                    <p>Send a message to start a chat</p>
                    <div className="send-button">
                        Send message
                    </div>
                </div>
            </div>
        </div>
      );
}
 
export default Messages;

/*{foundUsers && foundUsers.length > 0 ? (
                    foundUsers.map((user) => 
                        <div key={user._id} id="info-user" className="info-contents search-user" onClick={() => handleSearch(user)}>
                            <UserInfo user={user} />
                </div>)
                ):(
                    <p>No users found!</p>
                )
            }*/