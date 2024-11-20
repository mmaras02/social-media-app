import Navbar from "../components/shared/Navbar";
import "../styles/messages.css";
//import "../styles/editProfile.css";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { fetchData } from "../utils/fetchData";
import UserList from "../components/user/UserList";
import ChatRoom from "../components/message/ChatRoom";
import { useFeed } from "../context/feedContext";
import { useAuth } from "../context/authContext";

const ChatPage = () => {
    const token = localStorage.getItem("token");
    const { users } = useFeed();
    const { user: loggedUser } = useAuth();
    const [selectedUser, setSelectedUser] = useState(null);
    const [messageToSend, setMessageToSend] = useState("");
    const [currentChat, setCurrentChat] = useState(null);
    const [chatMessages, setChatMessages] = useState([]);
    const [conversations, setConversations] = useState([]);


    useEffect(() => {
        if (loggedUser) {
            const fetchConversations = async () => {
                const { data } = await fetchData(`/api/messages/${loggedUser._id}`, "GET", token);
                setConversations(data || []);
            };
            fetchConversations();
        }
    }, [loggedUser, token]);

    useEffect(() => {
        if (currentChat) {
            const fetchMessages = async () => {
                const { data } = await fetchData(`/api/conversation/${currentChat._id}`, "GET", token);
                setChatMessages(data || []);
            };
            fetchMessages();
        } else {
            setChatMessages([]);
        }
    }, [currentChat, token]);

    useEffect(() => {
        if (loggedUser && selectedUser) {
            const selectedChat = conversations.find((convo) => 
                convo.participants.includes(selectedUser._id)
            );
            setCurrentChat(selectedChat || null);
        }
    }, [loggedUser, selectedUser, conversations]);
    
    //const foundUsers = users && loggedUser?.following?.length ? users.filter(user => loggedUser.following.includes(user._id)) : []; 
    //const foundUsers = users && conversations ? users.filter(user => conversations.some(convo => convo.receiverId === user._id)):[];
    const receiversList = conversations?.map(convo => {
        return convo.participants.find(id => id !== loggedUser._id);
    }) 
    const foundUsers = users?.filter(user => receiversList?.includes(user._id)) || [];

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
        setChatMessages(prev => [...prev, newMessage]);

        const {error} = await fetchData('/api/messages/send', 'POST', token, newMessage);
        if (error) {
            alert("Error sending message");
            setChatMessages(prev => prev.filter(msg => msg !== newMessage));
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
 
export default ChatPage;