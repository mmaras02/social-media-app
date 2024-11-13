import { useState } from "react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();   

    const handleLogin = async (e) =>{
        e.preventDefault();

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                console.log("token:" , data.token);//ovdi radi token
                navigate("/home");
            } else {
                console.log('Error:', data.error);
            }
        } catch (error) {
            console.error('An error occurred during login:', error);
        }
    }
    
    return ( 
        <div className="login-container">
           <img id="phone" src="/images/phone.png" alt="Phone" />
           <div className="form-box">
            <div className="login-box">
                <img src="/images/instagram.png" alt="Instagram logo" />
                <form className="login-info" onSubmit={handleLogin}>
                    {/*<MdEmail />*/}
                    <input type="text" placeholder="Phone number, username or email" required className="info-box" value={email} onChange={(e) => {setEmail(e.target.value)} } />
                    {/*<FaLock />*/}
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