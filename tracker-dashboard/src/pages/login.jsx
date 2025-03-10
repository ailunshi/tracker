import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();
        try {
            await login(email, password);
            navigate('/tracker'); // Redirect on success
        } catch (error) {
            setMessage("Login failed. Please try again.");
        }
    }

    return (
        <div className="login-container">
            <div className="login-left">
            </div>

            <div className="login-right">
                <h1 className="frontTitle">Welcome back</h1>
                <form onSubmit={handleLogin}>
                    <div className="inputContainer">
                        <p className="tightText">Email</p>
                        <input 
                            type="text" 
                            className="input" 
                            placeholder="jade-isel19@ortiza.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    
                        <div className="password-header">
                            <p className="tightText">Password</p>
                            <Link to="forgot-password" className= "smallText" style={{color: "var(--urgent-indigo)", fontWeight: "semibold", fontStyle: "italic"}}>Forgot password?</Link>
                        </div>

                        <input 
                            type="password" 
                            className="input" 
                            placeholder="Enter your password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="container">
                        <button type="submit" className="button button-small">Submit</button>
                        <div className="container container-small">
                            <p className="smallText">
                                Don't have an account yet? <Link to="/registration-name" style={{color: "var(--urgent-indigo)", fontWeight: "bold", textDecorationLine: "underline"}}>Sign up here.</Link>
                            </p>
                        </div>
                    </div>
                    {message && <p className="error-message">{message}</p>}
                </form>
            </div>
        </div>
    );
}

export default Login;