import { Link } from 'react-router-dom'
import backArrow from "../assets/arrow_back.svg";
import { useRegister } from '../context/RegisterContext';

const RegistrationPassword = () => {
    const { formData, updateFormData, registerUser, error } = useRegister();

    const handleSubmit = async () => {
        const success = await registerUser();
        if (!success) {
            console.error("Registration failed.");
        }
    };
    
    return (
        <div className="landing-page-container">
            <Link to="/registration-email">
                <img src={backArrow} alt="back arrow" className="backArrow"/>
            </Link>
            <div className="container">
                <h1 className="frontTitle">Create your password for
                    <div className="emphasis">{formData.email}</div>
                </h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="container-left">
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

                <div className="container-submit-button">
               
                    <Link to="/login">
                        <button type="submit" onClick={handleSubmit} className="button button-small">
                            Create Account
                        </button>
                        {error && <p className="error-message">{error}</p>}
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default RegistrationPassword;