import React from "react";
import { useNavigate } from "react-router-dom";
import "./user.css"
import { FaTrashAlt } from "react-icons/fa";

const UserInfo = ({ user, showDeleteButton, onDeleteButton, description, disableNavigation}) => {//disable-->makni navigaciju
    const navigate = useNavigate();

    const handleNavigation = (e) => {
        if(!disableNavigation){
            e.stopPropagation();
            navigate(`/profiles/${user?.username}`);
        }
    }

    return ( 
        <div className="user-info" onClick={handleNavigation}>
            <img 
                src={user?.profilePicture ? user?.profilePicture : '/images/profile.png'} 
                alt="profile" 
            />
            <p>{user?.username}</p>
            {showDeleteButton && (
                <FaTrashAlt  
                    style={{ marginLeft:  '200px', fontSize: '18px' }} 
                    onClick={onDeleteButton} 
                />
            )}
            {description && <p>{description}</p>}
        </div>
    );
}

export default UserInfo;