import { Link } from 'react-router-dom'
import backArrow from "../assets/arrow_back.svg";

const RegistrationPassword = () => {
    return (
        <div>
            <Link to="/registration-name">
                <img src={backArrow} alt="back arrow" className="backArrow"/>
            </Link>
            <div className="container">
                <h1 className="frontTitle">Nice to meet you, 
                    <div className="emphasis">Jade Isel</div></h1>
            </div>

            <div className="inputContainer">
                <p className="tightText">What's your email?</p>
                <input type="text" className="input" placeholder="jade-isel19@ortiza.com" />
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