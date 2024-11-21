import { useState } from "react";
import "./auth.css";
import { useAuth } from "../../context/authContext";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth(); 

    const handleLogin = async (e) =>{
        e.preventDefault();
        login(email,password, () => setPassword(''));
    }
    
    return ( 
        <div className="login-container">
           <img id="phone" src="/images/phone.png" alt="Phone" />
           <div className="form-box">
            <div className="login-box">
                <img src="/images/instagram.png" alt="Instagram logo" />
                <form className="login-info" onSubmit={handleLogin}>
                    <input type="text" placeholder="Phone number, username or email" required className="info-box" value={email} onChange={(e) => {setEmail(e.target.value)} } />

                    <input type="password" placeholder="Password" name="psw" required className="info-box" value={password} onChange={(e) => {setPassword(e.target.value)} } />
                    <button className="action-button" type="submit" >Log in</button>
                </form>
                
                <p><a href="#" id="forgot-psswrd">Forgot your password?</a></p>
            </div>
            <div className="signup-text">
                <p id="signup-text">Don't have an account? <a href="/register" id="signup-link">Signup!</a></p>
            </div>
            </div>
        </div>
     );
}
 
export default Login;