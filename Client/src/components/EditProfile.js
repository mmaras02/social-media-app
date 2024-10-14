import Navbar from "./Navbar";
import "../styles/editProfile.css";
import "../styles/profile.css";
import "../styles/navbar.css";
import "../styles/create.css";
import { useLocation } from 'react-router-dom';
import { useState } from "react";

const EditProfile = () => {
    const location = useLocation();
    const { user } = location.state;
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState(user.bio || "");
    const [file, setFile] = useState("");
    const token = localStorage.getItem("token");

    const onChangeFile = (e) => {
        const file = e.target.files[0];
        setFile(file);
    }

    const handleChangePhotoClick = (e) => {
        e.preventDefault();
        document.getElementById("fileInput").click();
    }
    const handleSubmit = async(e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("username", username);
        formData.append("bio", bio);
        formData.append("image", file);

        try{
            const response = await fetch(`/api/user/${user._id}`, {
                method: 'PATCH',
                body: formData,
                headers: {
                        'Authorization': `Bearer ${token}`,
                    }
            });
            const data = await response.json();

            if (response.ok) {
                alert("Profile edited");
                setFile(null);
                setUsername("");
                setBio("");
              } else {
                throw Error("something went wrong");
              }

        } catch(error){
            console.log("Error submitting the form", error);
        }
    }
    return ( 
        <div className="edit-profile-container">
            <Navbar />
            <div className="profile-content">
                <div className="all-settings-container">
                </div>
                {user && (
                <div className="edit-container">
                    <form className="edit-small-container" onSubmit={handleSubmit}>
                        <h2>Edit profile</h2>
                        <div className="change-photo-section">
                            <div className="info-contents">
                                <input id="fileInput" type="file" accept="image/*" onChange={onChangeFile} name="image" style={{ display: "none" }}/>
                                <img src={user.profilePicture ? user.profilePicture : '/images/profile.png'} alt="profile" />
                                <p>{user.username}</p>
                            </div>
                            <button className="upload-button" onClick={handleChangePhotoClick}>Change photo</button>
                        </div>

                        <div className="change-info-section">
                            <h3>Name</h3>
                            <input className="bio input" type="text" placeholder={user.username} onChange={(e) => setUsername(e.target.value)} />
                        </div>

                        <div className="change-info-section">
                            <h3>Bio</h3>
                            <textarea className="bio textarea" type="text" value={bio} onChange={(e) => setBio(e.target.value)} />
                        </div>
                        <div className="change-info-section">
                            <h3>Gender</h3>
                            <input className="bio input" type="text" />
                        </div>
                    
                        <button className="upload-button submit" type="submit">Submit</button>

                    </form>
                </div>
                )}

            </div>
        </div>
    );
}
 
export default EditProfile;