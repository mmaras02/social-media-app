import Login from './pages/LoginPage';
import Home from './features/feed/HomePage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatPage from './pages/ChatPage';
import Create from './pages/CreatePage';
import Search from './components/shared/Search';
import Registration from './pages/RegistrationPage';
import ProfilePage from './features/profile/ProfilePage';
import EditProfile from './features/profile/EditProfile';
import Post from './components/posts/Post';

function App() {
  return (
      <div className="App">
        <div className="content">
          <Routes>
            <Route exact path="/" element = {<Login />}></Route>
            <Route exact path="/register" element = {<Registration />}></Route>
            <Route exact path="/home" element = {<Home />}></Route>
            <Route exact path="/messages" element = {<ChatPage />}></Route>
            <Route exact path="/create" element = {<Create />}></Route>
            <Route exact path="/search" element = {<Search />}></Route>
            <Route exact path="/edit" element = {<EditProfile />}></Route>
            <Route exact path="/profile/post/:id" element = {<Post />}></Route>
            <Route exact path="/profile" element = {<ProfilePage />}></Route>
            <Route path="/profiles/:username" element = {<ProfilePage />}></Route>
          </Routes>
        </div>
      </div>
    
  );
}

export default App;
