import "../styles/navbar.css";
import { FaSearch,FaRegPaperPlane, FaRegHeart, FaInstagram} from "react-icons/fa";
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

    return ( 
        <div className="navbar short">
            <div id="icon" className="navbar-components small" onClick={handleClick1}>
                <span><FaInstagram /></span>
            </div>
            <div className="navbar-components small" onClick={handleClick1}>
                <span><FaHouse /></span>
            </div>

            <div className="navbar-components small">
                <span><FaSearch /></span>
            </div>

            <div className="navbar-components small">
                <span><MdExplore /></span>
            </div>

            <div className="navbar-components small" onClick={handleClick2}>
                <span><FaRegPaperPlane  /></span>
            </div>

            <div className="navbar-components small">
                <span><FaRegHeart /></span>
            </div>

            <div className="navbar-components small" onClick={handleCreate}>
                <span><LuPlusSquare /></span>
            </div>

            <div className="navbar-components small" onClick={handleClick}>
                <span><CgProfile /></span>
            </div>
            {showPopUp && <Create />}

        </div>
        );
}

export default Navbar;