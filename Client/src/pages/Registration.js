import { useState } from "react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const result = await fetch('/register', {
                method:'POST', 
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email,password,name,username})});
            if(result.ok){
                alert("Account succesfully made!");
                navigate(-1);
                //vrati se na login stranicu--> to u serveru napravi
            }else{
                console.log('failed');
            }
        } catch (error){
            throw Error('Unable to register');
        }
        
    }

    return ( 
        <div className="registration-container">
            <div className="registration-box">
                <img src="/images/instagram.png" />
                <form className="login-info" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Phone number, username or email" required className="info-box" value={email} onChange={(e) => {setEmail(e.target.value)} }/>
                    <input type="password" placeholder="Password" required className="info-box" value={password} onChange={(e) => {setPassword(e.target.value)} } />
                    <input type="text" placeholder="Username" required className="info-box" value={username} onChange={(e) => {setUsername(e.target.value)} } />
                    <input type="text" placeholder="Full name" required className="info-box" value={name} onChange={(e) => {setName(e.target.value)} } />
                    <button className="action-button">Register</button>
                </form>
            </div>
        </div>
     );
}
 
export default Registration;