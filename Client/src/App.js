import Login from './components/Login';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from './components/Profile';
import Messages from './components/Messages';
import Create from './components/Create';
import Search from './components/Search';
import Explore from './components/Explore';
import Registration from './components/Registration';
import EditProfile from './components/EditProfile';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route exact path="/" element = {<Login />}></Route>
            <Route exact path="/register" element = {<Registration />}></Route>
            <Route exact path="/home" element = {<Home />}></Route>
            <Route exact path="/profile" element = {<Profile />}></Route>
            <Route exact path="/messages" element = {<Messages />}></Route>
            <Route exact path="/create" element = {<Create />}></Route>
            <Route exact path="/search" element = {<Search />}></Route>
            <Route exact path="/explore" element = {<Explore />}></Route>
            <Route exact path="/edit" element = {<EditProfile />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
    
  );
}

export default App;
