import SearchInput from "../shared/SearchInput";
import "../../styles/messages.css";

const Conversations = ({conversations, users, loggedUser, handleMessage}) => {

const receiversList = conversations?.map(convo => {
        return convo.participants.find(id => id !== loggedUser._id);
    }) 
    const foundUsers = users?.filter(user => receiversList?.includes(user._id)) || [];

    return (
        <div className="all-settings-container messages">
            <div className="search-title">
                <h2>Message</h2>
            </div>
            <SearchInput foundUsers={foundUsers} handleUser={handleMessage} disableNavigation={true}/>
        </div>
      );
}
 
export default Conversations;