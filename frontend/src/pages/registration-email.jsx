import { Link } from 'react-router-dom'
import backArrow from "../assets/arrow_back.svg";
import { useRegister } from '../context/RegisterContext';

const RegistrationPassword = () => {
    const { formData, updateFormData } = useRegister();

    return (
        <div className="landing-page-container">
            <Link to="/registration-name">
                <img src={backArrow} alt="back arrow" className="backArrow"/>
            </Link>
            <div className="container">
                <h1 className="frontTitle">Nice to meet you, 
                    <div className="emphasis">{formData.name}</div></h1>
            </div>

            <div className="container-left">
                <p className="tightText">What's your email?</p>
                <input 
                    type="text" 
                    className="input" 
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    placeholder="jade-isel19@ortiza.com"
                />
            </div>
                
            <div className="container-submit-button">
                <Link to="/registration-password">
                    <button className="button button-small">Next</button>
                </Link>
            </div>
        </div>

    );
};

export default RegistrationPassword;