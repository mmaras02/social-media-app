import "../styles/navbar.css";
import { FaSearch, FaRegPaperPlane, FaRegHeart, FaInstagram } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { MdExplore } from "react-icons/md";
import { LuPlusSquare } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { IoReorderThree } from "react-icons/io5";
import Create from "../pages/Create";
import { useState } from "react";
import Search from "../pages/Search";

import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

const Navbar = ({isShort}) => {
    const navigate = useNavigate();
    const [showPopUp, setShowPopUp] = useState(false);
    const [isShortNavbar, setIsShortNavbar] = useState(isShort);
    const [searchPopUp, setSearchPopUp] = useState(false);

    const [isPaneOpen, setIsPaneOpen] = useState(false);


    const toggleNavbar = () => {
        setIsShortNavbar(true); 
        setIsPaneOpen(true)
    };

    const handleClosePane = () => {
        setIsPaneOpen(false);
        setIsShortNavbar(false);
    };

    const handleMessages = () => {
        navigate("/messages", { state: { isShortNavbar: true } });
    }

    const handleLogout = () => {
        alert("logout success");
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <div className={`navbar ${isShortNavbar ? "short" : ""}`}>
            <div id="icon" className="navbar-components insta-img" onClick={() => navigate("/home")}>
                {isShortNavbar ? (
                        <span><FaInstagram /></span>
                    ) : (
                        <img src="/images/instagram1.png" alt="Instagram" />
                    )}
            </div>
            <div className="navbar-components" onClick={() => navigate("/home")}>
                
                <span><FaHouse /></span>
                <a>Home</a>
            </div>

            <div className="navbar-components" onClick={toggleNavbar}>
                <span><FaSearch /></span>
                <a>Search</a>
            </div>

            <div className="navbar-components" >
                <span><MdExplore /></span>
                <a>Explore</a>
            </div>

            {/*just to try sliding pane for search */}
            <SlidingPane
                isOpen={isPaneOpen}
                from="left"
                width="400px"
                className="custom-pane" 
                onRequestClose={handleClosePane}
            >
                <Search isActive={true} />
            </SlidingPane>



            <div className="navbar-components" onClick={handleMessages}>
                <span><FaRegPaperPlane /></span>
                <a>Messages</a>
            </div>

            <div className="navbar-components">
                <span><FaRegHeart /></span>
                <a>Notifications</a>
            </div>

            <div className="navbar-components" onClick={() => setShowPopUp(true)}>
                <span><LuPlusSquare /></span>
                <a>Create</a>
            </div>

            <div className="navbar-components" onClick={() => navigate("/profile")}>
                <span><CgProfile /></span>
                <a>Profile</a>
            </div>

            <div className="navbar-components more-info">
                <span><IoReorderThree style={{fontSize:'35px'}} onClick={handleLogout}/></span>
                <a>Logout</a>
            </div>

            {showPopUp && <Create onClose={() => setShowPopUp(false)} />}
            {searchPopUp && <Search isActive = {searchPopUp}/>}
        </div>
    );
};

export default Navbar;