import { useState } from "react";
import "../styles/create.css";
import { IoMdClose } from "react-icons/io";

const Create = ( {onClose}) => {
  const [file, setFile] = useState("");
  const [user, setUser] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const token = localStorage.getItem("token");

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    setFile(file);

    console.log("file", file);
    console.log("filename", file.name);

    if (file) {
      setImage(URL.createObjectURL(file)); 
      setShowImagePreview(true);
    }
  }

  const handleUpload = async(e) => {
    e.preventDefault();

    //getting the user _id
    const response = await fetch('/api/user/profile',{
      headers: {
          'Authorization': `Bearer ${token}`
      }});
    const user = await response.json();

    if(response.ok){
      setUser(user);
    }

    //imamo description, user i image
    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("description", description);
    formData.append("image", file);

    console.log("form data", formData);

    try {
      const response = await fetch("/api/posts/newpost", {
        method: "POST",
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      const json = await response.json();
      console.log(json);

      if (response.ok) {
        alert("Post created!");
        setImage(null);
        setDescription("");
        setShowImagePreview(false);
      } else {
        throw Error("something went wrong");
      }
    } catch (error) {
      console.log("Error submitting the form", error);
    }
  }

    return (
        <div className="create-modal">
          <div className="create-content">
            <div className="title-content">
                {/*<button className="close-button">X</button>*/}
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
                  <img src={image} alt="post-photo" />
                  <div className="description-container">
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