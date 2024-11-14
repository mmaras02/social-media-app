import Navbar from "../components/Navbar";
import "../styles/messages.css";
import "../styles/editProfile.css";
import useFetch from "../hooks/useFetch";
import UserList from "../components/UserList";
import { useEffect, useState } from "react";
import { fetchData } from "../utils/fetchData";
import ChatRoom from "../components/ChatRoom";

const Messages = () => {
    const token = localStorage.getItem("token");
    const {data:users} = useFetch('/api/user/all', token);
    const {data:loggedUser} = useFetch('/api/user/profile', token);
    const [selectedUser, setSelectedUser] = useState("");
    const [messageToSend, setMessageToSend] = useState("");
    const [currentChat, setCurrentChat] = useState("");
    const {data:conversations} = useFetch(loggedUser ? `/api/messages/${loggedUser._id}`: null, token);

    useEffect(() => {
        if(loggedUser && selectedUser && conversations){
            const selectedChat = conversations.find(convo => convo.participants.includes(selectedUser._id));
            setCurrentChat(selectedChat || null);
        }

    },[loggedUser, selectedUser, conversations])

    const {data:chatMessages} = useFetch(currentChat ? `/api/conversation/${currentChat._id}`:null, 'token');

    const foundUsers = users && loggedUser?.following?.length ? users.filter(user => loggedUser.following.includes(user._id)) : []; 

    const handleMessage = (e, user) => {
        e.preventDefault();
        setSelectedUser(user);
    }

    const sendMessage = async(messageToSend) => {
        const newMessage = {
            senderId:loggedUser._id,
            receiverId:selectedUser._id,
            message:messageToSend
        };

        const {data, error} = await fetchData('/api/messages/send', 'POST', token, newMessage);
        if (error) {
            alert("Error sending message");
        } else {
            alert("Message sent!");
        }
        setMessageToSend("");
    }

    return (
        <div className="messages-container">
            <Navbar isShort={true}/>
            <div className="messages-content">
                <div className="all-settings-container messages">
                    <div className="search-title">
                        <h2>Message</h2>
                    </div>
                    <UserList foundUsers={foundUsers} handleUser={handleMessage} disableNavigation={true}/>
                </div>
                <div className="write-messages-content">
                    {selectedUser ? (
                        <ChatRoom selectedUser={selectedUser}
                                  loggedUser={loggedUser}
                                  chatMessages={chatMessages}
                                  messageToSend={messageToSend}
                                  setMessageToSend={setMessageToSend}
                                  sendMessage={sendMessage}  />
                    ) : (
                        <>
                            <img src="/images/messagesIcon.png" alt="text-icon" id="text-icon"/>
                            <h3>Your messages</h3>
                            <p>Send a message to start a chat</p>
                            <div className="send-button">
                                Send message
                            </div>
                        </>
                )}
                </div>
                
            </div>
        </div>
      );
}
 
export default Messages;