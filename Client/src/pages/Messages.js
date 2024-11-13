import Navbar from "../components/Navbar";
import "../styles/messages.css";
import "../styles/editProfile.css";
import useFetch from "../hooks/useFetch";
import UserInfo from "../components/UserInfo";
import UserList from "../components/UserList";
import { useEffect, useState } from "react";
import Message from "../components/message/Message";
import { fetchData } from "../utils/fetchData";

const Messages = () => {
    const token = localStorage.getItem("token");
    const {data:users} = useFetch('/api/user/all', token);
    const {data:loggedUser} = useFetch('/api/user/profile', token);//imamo logged user
    const [selectedUser, setSelectedUser] = useState("");
    const [messageToSend, setMessageToSend] = useState("");
    //const {data, error} = fetchData('/api/user/profile','POST', token, newMessage);

    const [currentChat, setCurrentChat] = useState("");

    //tribamo nac conversation sa set UserModel

    console.log("logged user", loggedUser);
    const {data:conversations} = useFetch(loggedUser ? `/api/messages/${loggedUser._id}`: null, token);
    console.log("conversations", conversations);

    useEffect(() => {
        if(loggedUser && selectedUser && conversations){
            const selectedChat = conversations.find(convo => convo.participants.includes(selectedUser._id));
            console.log("selectedChat",selectedChat);
            setCurrentChat(selectedChat);
        }

    },[loggedUser, selectedUser, conversations])

    const {data:chatMessages} = useFetch(currentChat ? `/api/conversation/${currentChat._id}`:null, 'token');
    console.log("cahat", chatMessages);

    //const current = conversations?.filter(user => user._id !== selectedUser._id);
    //console.log("current", current);

    //dio sa ispisom svih korisnika
    const foundUsers = users && loggedUser?.following?.length ? users.filter(user => loggedUser.following.includes(user._id)) : []; 
    console.log("foundusers", foundUsers);

    const handleMessage = (e, user) => {
        e.preventDefault();
        setSelectedUser(user);
    }

    const handleMessageToSend = (e) => {
        setMessageToSend(e.target.value);
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
                        <div className="write-messages">
                            <UserInfo user={selectedUser} />
                            <div className="chat-room">
                                {chatMessages  ? (
                                    chatMessages.map((message, index) => {
                                    const receiverImage = selectedUser.profilePicture ? selectedUser.profilePicture : '/images/profile.png' ;
                                    console.log("message object:", message);
                                    return (
                                        <Message 
                                            key={index} 
                                            sender={message.senderId === loggedUser._id} 
                                            receiverImage={receiverImage}
                                            message={message}
                                        />
                                    );
                                })
                                ) : (
                                <p>No messages with this person</p>
                                )}
                            </div>
                            <div className="send-message">
                                <textarea className="bio input" type="text" placeholder="Message..." value={messageToSend} onChange={handleMessageToSend} />
                                <button className="action-button post-button" onClick={() => sendMessage(messageToSend)}>Send</button>
                            </div>
                        </div>

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

/*{foundUsers && foundUsers.length > 0 ? (
                    foundUsers.map((user) => 
                        <div key={user._id} id="info-user" className="info-contents search-user" onClick={() => handleSearch(user)}>
                            <UserInfo user={user} />
                </div>)
                ):(
                    <p>No users found!</p>
                )
            }*/