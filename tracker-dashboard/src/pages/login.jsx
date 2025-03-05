import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className="login-container">

            <div className="login-left">
            </div>

            <div className="login-right">
                <h1 className="frontTitle">Welcome back</h1>

                <div className="inputContainer">
                    <p className="tightText">Email</p>
                    <input type="text" className="input" placeholder="jade-isel19@ortiza.com" />
                
                    <div className="password-header">
                        <p className="tightText">Password</p>
                        <p className="smallText" style={{color: "var(--urgent-indigo)", fontWeight: "semibold", fontStyle: "italic"}}>Forgot password?</p>
                        {/*still need to link forgot password to a new page*/}
                    </div>
                    <input type="password" className="input" placeholder="Enter your password" />
                </div>

                <div className="container">
                    <button className="button button-small">Submit</button>
                <p className="smallText">Don't have an account yet? <Link to="/registration-name" style={{color: "var(--urgent-indigo)", fontWeight: "bold", textDecorationLine: "underline"}}>Sign up here.</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
