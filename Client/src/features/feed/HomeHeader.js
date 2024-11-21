import "./home.css";

const HomeHeader = ({currentView, setCurrentView}) => {
    return ( 
        <div className="home-header">
            <p onClick={() => setCurrentView("following")}
            className={`tab ${currentView === "following" ? "active" : ""}`} > Following </p>
            <p onClick={() => setCurrentView("all")}
                className={`tab ${currentView === "all" ? "active" : ""}`} > All Posts </p>
        </div>
    )
}

export default HomeHeader;