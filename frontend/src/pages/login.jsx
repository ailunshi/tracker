import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UnderlineInput from '../components/UnderlineInput';
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();

        if (!email || !password) {
            setMessage("Please fill in all fields.");
            return;
        }
        
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
                <div className="circle">
                    
                </div>
            </div>

            <div className="login-right">
                <h1 className="frontTitle">Welcome back</h1>
                <form className="form-container" onSubmit={handleLogin}>
                    <div className="inputContainer">
                        <UnderlineInput
                            label="Email"
                            placeholder="jade-isel19@ortiza.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <UnderlineInput
                            label="Password"
                            placeholder="Enter your password"
                            value={password}
                            type="password"
                            rightLabel={<Link to="/forgot-password">Forgot password?</Link>}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="container">
                        <button type="submit" className="button button-small">Log In</button>
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