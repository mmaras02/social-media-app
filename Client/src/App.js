import Login from './pages/Login';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Messages from './pages/Messages';
import Create from './components/Create';
import Search from './pages/Search';
import Explore from './components/Explore';
import Registration from './pages/Registration';
import EditProfile from './components/EditProfile';
import Post from './components/Post';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route exact path="/" element = {<Login />}></Route>
            <Route exact path="/register" element = {<Registration />}></Route>
            <Route exact path="/home" element = {<Home />}></Route>
            
            <Route exact path="/messages" element = {<Messages />}></Route>
            <Route exact path="/create" element = {<Create />}></Route>
            <Route exact path="/search" element = {<Search />}></Route>
            <Route exact path="/explore" element = {<Explore />}></Route>
            <Route exact path="/edit" element = {<EditProfile />}></Route>
            <Route exact path="/profile/post/:id" element = {<Post />}></Route>

            <Route exact path="/profile" element = {<ProfilePage />}></Route>
            <Route path="/profiles/:username" element = {<ProfilePage />}></Route>
            
          </Routes>
        </div>
      </div>
    </Router>
    
  );
}

export default App;
