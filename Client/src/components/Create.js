import "../styles/create.css";

const Create = () => {
    return (
        <div className="create-modal">
          <div className="create-content">
            <div className="title-content">
                {/*<button className="close-button">X</button>*/}
                <h3>Create new post</h3>
            </div>
            <div className="upload-photo-container">
                <img src="/images/create.png" />
                <p>Drag photos and videos here</p>
                <div className="upload-button">Select from computer</div>
            </div>
            
          </div>
        </div>
      );
    };
    
    export default Create;