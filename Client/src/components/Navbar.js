import "../styles/navbar.css";
import { FaSearch,FaRegPaperPlane, FaRegHeart } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { MdExplore } from "react-icons/md";
import { LuPlusSquare } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import Create from "./Create";
import { useState } from "react";

const Navbar = ( ) => {
    const navigate=useNavigate();
    const [showPopUp,setShowPopUp] = useState(false);

    const handleClick = () =>   {
        navigate("/profile");
    }
    const handleClick1 = () =>   {
        navigate("/home");
    }
    const handleClick2 = () =>   {
        navigate("/messages");
    }
    const handleCreate = () =>   {
        setShowPopUp(true);//pop up is open
    }
    const handleSearch = () => {
        navigate("/search");
    }

    const handleExplore = () => {
        navigate("/explore");
    }
    
    return ( 
        <div className="navbar">
            <img src="/images/instagram1.png" />
            <div className="navbar-components" onClick={handleClick1}>
                <span><FaHouse /></span>
                <a>Home</a>
            </div>

            <div className="navbar-components" onClick={handleSearch}>
                <span><FaSearch /></span>
                <a>Search</a>
            </div>

            <div className="navbar-components" onClick={handleExplore}>
                <span><MdExplore /></span>
                <a>Explore</a>
            </div>

            <div className="navbar-components" onClick={handleClick2}>
                <span><FaRegPaperPlane  /></span>
                <a>Messages</a>
            </div>

            <div className="navbar-components">
                <span><FaRegHeart /></span>
                <a>Notifications</a>
            </div>

            <div className="navbar-components" onClick={handleCreate}>
                <span><LuPlusSquare /></span>
                <a>Create</a>
            </div>

            <div className="navbar-components" onClick={handleClick}>
                <span><CgProfile /></span>
                <a>Profile</a>
            </div>
            {showPopUp && <Create />}

        </div>
        );
}

export default Navbar;