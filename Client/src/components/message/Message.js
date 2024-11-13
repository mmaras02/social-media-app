import "./message.css";
import moment from 'moment';

const Message = ({sender,receiverImage, message}) => {
    const timeAgo = moment(message.createdAt).fromNow();
    
    return ( 
        <div className={sender ? " message sender" : "message"}>
            <div className="messageTop">
                <img className="messageImg" src={receiverImage}
                alt="profile" ></img>
                <p className="messageText">{message.message}</p>
            </div>
            <div className="messageBottom">
                <p>{timeAgo}</p>

            </div>
        </div>
     );
}
 
export default Message;