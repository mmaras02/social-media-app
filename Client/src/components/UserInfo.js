import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const UserInfo = ({ user, showDots, onDotsClick, description }) => {
    const navigate = useNavigate();

    return ( 
        <div className="user-info" onClick={() => navigate(`/profiles/${user.username}`)}>
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