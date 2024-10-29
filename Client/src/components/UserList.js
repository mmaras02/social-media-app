import UserInfo from "../components/UserInfo";
import "../styles/messages.css";
import "../styles/search.css";

const UserList = ({foundUsers, handleUser}) => {
    return (
        <div className="user-list">
            <div className="display-users-container">
                <h4>Recent</h4>
                {foundUsers && foundUsers.length > 0 ? (
                    foundUsers.map((user) => 
                        <div key={user._id} id="info-user" className="info-contents" onClick={() => handleUser(user)}>
                            <UserInfo user={user} />
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
