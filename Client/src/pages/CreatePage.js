import { useState } from "react";
import "../styles/create.css";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "../context/authContext";
import { useFeed } from "../context/feedContext";

const Create = ( {onClose}) => {
  const [file, setFile] = useState("");
  const {user} = useAuth();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [showImagePreview, setShowImagePreview] = useState(false);

  const {createPost} = useFeed();

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    setFile(file);

    if (file) {
      setImage(URL.createObjectURL(file)); 
      setShowImagePreview(true);
    }
  }

  const handleUpload = async(e) => {
    e.preventDefault();
    if (!user) {
      alert("User not loaded yet!");
      return;
    }

    const newPostData = {
      userId: user._id,
      description,
      file,
    };
    await createPost(newPostData);
  }

    return (
        <div className="create-modal">
          <div className={`create-content ${showImagePreview ? "expanded" : ""}`}>
            <div className="title-content">
                <h3>Create new post</h3>
                <IoMdClose onClick={onClose} />
            </div>
            <div className="upload-photo-container">
              {!showImagePreview ? (
                <div className="upload-placeholder">
                  <img src="/images/create.png" />
                  <p>Drag photos and videos here</p>
                  <input type="file" accept="image/*" name="image" onChange={handleImagePreview} style={{ display: "none" }}/>
                  <div className="upload-button" onClick={() => document.querySelector('input[type="file"]').click()}>Select from computer</div></div>
                
              ) : (

                <div className="preview-container">
                  <div className="upload-image-container">
                    <img src={image} alt="post-photo" />
                  </div>
                  <div className="upload-description-container1">
                    <div className="info-contents">
                      <img src={user.profilePicture ? user.profilePicture : '/images/profile.png'} alt="profile" />
                      <p>{user.username}</p>
                    </div>
                    <textarea type="text" placeholder="Write a description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                    <button className="upload-button" onClick={handleUpload}>Upload post</button>
                  </div>

                </div>
              )}
            </div>
          </div>
        </div>
      );
    };
    
    export default Create;