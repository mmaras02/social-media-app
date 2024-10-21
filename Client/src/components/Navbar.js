import "../styles/navbar.css";
import { FaSearch, FaRegPaperPlane, FaRegHeart, FaInstagram } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { MdExplore } from "react-icons/md";
import { LuPlusSquare } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import Create from "./Create";
import { useState } from "react";
import Search from "./Search";

const Navbar = () => {
    const navigate = useNavigate();
    const [showPopUp, setShowPopUp] = useState(false);
    const [isShortNavbar, setIsShortNavbar] = useState(false);
    const [searchPopUp, setSearchPopUp] = useState(false);

    const toggleNavbar = () => {
        setSearchPopUp(true);
        setIsShortNavbar(true);
    };

    return (
        <div className={`navbar ${isShortNavbar ? "short" : ""}`}>
            <div id="icon" className="navbar-components" onClick={() => navigate("/home")}>
                {isShortNavbar ? (
                        <span><FaInstagram /></span>
                    ) : (
                        <img src="/images/instagram1.png" alt="Instagram" />
                    )}
            </div>
            <div className="navbar-components" onClick={() => navigate("/home")}>
                <span><FaHouse /></span>
                {!isShortNavbar && <a>Home</a>}
            </div>

            <div className="navbar-components" onClick={toggleNavbar}>
                <span><FaSearch /></span>
                {!isShortNavbar && <a>Search</a>}
            </div>

            <div className="navbar-components">
                <span><MdExplore /></span>
                {!isShortNavbar && <a>Explore</a>}
            </div>
            <div className="navbar-components" onClick={() => navigate("/messages")}>
                <span><FaRegPaperPlane /></span>
                {!isShortNavbar && <a>Messages</a>}
            </div>

            <div className="navbar-components">
                <span><FaRegHeart /></span>
                {!isShortNavbar && <a>Notifications</a>}
            </div>

            <div className="navbar-components" onClick={() => setShowPopUp(true)}>
                <span><LuPlusSquare /></span>
                {!isShortNavbar && <a>Create</a>}
            </div>

            <div className="navbar-components" onClick={() => navigate("/profile")}>
                <span><CgProfile /></span>
                {!isShortNavbar && <a>Profile</a>}
            </div>

            {showPopUp && <Create onClose={() => setShowPopUp(false)} />}
            {searchPopUp && <Search onClose={() => setSearchPopUp(false)}/>}
        </div>
    );
};

export default Navbar;