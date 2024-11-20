import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../utils/fetchData";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const token = localStorage.getItem("token");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();   

    useEffect(() => {
        const getLoggedUser = async () => {
            setLoading(true);
            setError("");

            if (token) {
                const { data: userData, error } = await fetchData('/api/user/profile', 'GET', token);
                if (error) {
                    setError("Failed to fetch user. Please login again.");
                    setUser(null);
                    localStorage.removeItem("token");
                    navigate("/login"); 
                } else {
                    setUser(userData);
                }
        };
    }

        getLoggedUser();
    }, [token]);

    const login = async(email, password) => {
        setLoading(true);
        setError("");

        try{
            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();

            if (response.ok) {
                setUser({email: email, password:password})
                localStorage.setItem('token', data.token);
                navigate("/home");
            } else {
                setError(data.error || "Login failed. Please try again!");
            }

        } catch(err){
            setError("An error occurred, please check the connection");
        }
    }

    const register = async (email, password, name, username) => {
        setLoading(true);
        setError("");

        try{
            const result = await fetch('/register', {
                method:'POST', 
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email,password,name,username})});
            if(result.ok){
                alert("Account succesfully made!");
                navigate(-1);
            }else{
                setError("An error occured, Please try again!");
            }
        } catch (error){
            setError("Unable to register");
        }
        
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        navigate("/");
    }

    const isAuthenticated = () => {
        return Boolean(localStorage.getItem("token"));
    }

    return (
        <AuthContext.Provider
          value={{
            user,
            loading,
            error,
            login,
            register,
            logout,
            isAuthenticated,
          }}
        >
          {children}
        </AuthContext.Provider>
      );
};   
//export default AuthContext;
export const useAuth = () => useContext(AuthContext);