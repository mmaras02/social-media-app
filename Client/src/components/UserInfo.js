import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";

const UserInfo = ({ user, showDots, onDotsClick, description }) => {
    return ( 
        <div className="user-info">
            <img 
                src={user.profilePicture ? user.profilePicture : '/images/profile.png'} 
                alt="profile" 
            />
            <p>{user.username}</p>
            {showDots && (
                <HiDotsHorizontal 
                    style={{ marginLeft: '200px', fontSize: '25px' }} 
                    onClick={onDotsClick} 
                />
            )}
            {description && <p>{description}</p>}
        </div>
    );
}

export default UserInfo;