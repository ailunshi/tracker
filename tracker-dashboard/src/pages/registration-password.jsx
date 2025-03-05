import { Link } from 'react-router-dom'
import backArrow from "../assets/arrow_back.svg";
import { useRegister } from '../context/RegisterContext';

const RegistrationPassword = () => {
    const { formData, updateFormData } = useRegister();

    
    return (
        <div>
            <Link to="/registration-email">
                <img src={backArrow} alt="back arrow" className="backArrow"/>
            </Link>
            <div className="container">
                <h1 className="frontTitle">Create your password for
                    <div className="emphasis">{formData.email}</div>
                </h1>
            </div>

            <div className="inputContainer">
                <p className="tightText">Create a password</p>
                <input 
                    type="password" 
                    className="input" 
                    placeholder="********"
                    value={formData.password}
                    onChange={(e) => updateFormData('password', e.target.value)}
                />
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