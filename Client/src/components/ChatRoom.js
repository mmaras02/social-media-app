import Message from "../components/message/Message";
import InputAction from "./actions/InputAction";
import UserInfo from "../components/UserInfo";

const ChatRoom = ({selectedUser,loggedUser, chatMessages, messageToSend, setMessageToSend, sendMessage}) => {
    return ( 
        <div className="write-messages">
            <UserInfo user={selectedUser} />
            <div className="chat-room">
                {chatMessages  ? (
                    chatMessages.map((message, index) => {
                    const receiverImage = selectedUser.profilePicture ? selectedUser.profilePicture : '/images/profile.png' ;
 
                    return (
                        <Message 
                            key={index} 
                            sender={message.senderId === loggedUser._id} 
                            receiverImage={receiverImage}
                            message={message} />
                        )})
                ) : (
                    <p>No messages with this person</p>
                )}
            </div>

            <div className="send-message">
                <InputAction className={"bio input"}
                            text={messageToSend}
                            onTextChange={setMessageToSend}
                            handleText={() => sendMessage(messageToSend)}
                            placeholder={"Message..."}
                            buttonLabel={"send"}/>
            </div>
        </div>
     );
}
 
export default ChatRoom;