import Navbar from "./Navbar";
import "../styles/messages.css";

const Messages = () => {
    return (
        <div className="messages-container">
            <Navbar />
            <div className="messages-content">
                <img src="/images/messagesIcon.png" />
                <h3>Your messages</h3>
                <p>Send a message to start a chat</p>
                <div className="send-button">
                    Send message
                </div>
            </div>
        </div>
      );
}
 
export default Messages;