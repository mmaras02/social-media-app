import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import "./user.css"

const UserInfo = ({ user, showDots, onDotsClick, description, disableNavigation}) => {//disable-->makni navigaciju
    const navigate = useNavigate();

    const handleNavigation = () => {
        if(!disableNavigation){
            navigate(`/profiles/${user.username}`);
        }
    }

    return ( 
        <div className="user-info" onClick={handleNavigation}>
            <img 
                src={user.profilePicture ? user.profilePicture : '/images/profile.png'} 
                alt="profile" 
            />
            <p>{user.username}</p>
            {showDots && (
                <HiDotsHorizontal 
                    style={{ marginLeft:  '180px', fontSize: '25px' }} 
                    onClick={onDotsClick} 
                />
            )}
            {description && <p>{description}</p>}
        </div>
    );
}

export default UserInfo;