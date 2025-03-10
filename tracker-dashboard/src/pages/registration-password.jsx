import { Link } from 'react-router-dom'
import backArrow from "../assets/arrow_back.svg";
import { useRegister } from '../context/RegisterContext';

const RegistrationPassword = () => {
    const { formData, updateFormData, registerUser, error } = useRegister();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await registerUser();
    };
    
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

            <form onSubmit={handleSubmit}>
                <div className="inputContainer">
                    <p className="tightText">Create a password</p>
                    <input 
                        type="password" 
                        className="input" 
                        placeholder="********"
                        value={formData.password}
                        onChange={(e) => updateFormData('password', e.target.value)}
                    />
                    {error && <p className="error-message">{error}</p>}
                </div>

                <div className="buttonContainer">
                    <button type="submit" className="button button-small">Create Account</button>
                </div>
            </form>
        </div>
    );
};

export default RegistrationPassword;