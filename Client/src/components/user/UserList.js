//import "../styles/messages.css";
//import "../styles/search.css";
import UserInfo from "./UserInfo";

const UserList = ({foundUsers, handleUser, disableNavigation}) => {
    return (
        <div className="user-list">
            <div className="display-users-container">
                <h4>Recent</h4>
                {foundUsers && foundUsers.length > 0 ? (
                    foundUsers.map((user) => 
                        <div key={user._id} id="info-user" className="info-contents" onClick={(e) => handleUser(e, user)}>
                            <UserInfo user={user} disableNavigation={disableNavigation} />
                        </div>)
                        ):(
                            <p>No users found!</p>
                        )
                    }
            </div>
        </div>
     );
}
 
export default UserList;
