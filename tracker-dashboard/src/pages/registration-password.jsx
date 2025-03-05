import { Link } from 'react-router-dom'
import backArrow from "../assets/arrow_back.svg";

const RegistrationPassword = () => {
    return (
        <div>
            <Link to="/registration-email">
                <img src={backArrow} alt="back arrow" className="backArrow"/>
            </Link>
            <div className="container">
                <h1 className="frontTitle">Create your password for
                    <div className="emphasis">jade-isel19@ortiza.com</div>
                </h1>
            </div>

            <div className="inputContainer">
                <p className="tightText">Create a password</p>
                <input type="password" className="input" placeholder="********" />
            </div>

            <div className="buttonContainer">
                <Link to="/registration-password">
                    <button className="button button-small">Next</button>
                </Link>
            </div>
            
        </div>
    );
};

export default RegistrationPassword;