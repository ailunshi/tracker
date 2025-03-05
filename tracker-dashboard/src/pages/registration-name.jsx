import { Link } from 'react-router-dom'

const RegistrationName = () => {
    return (
        <div>
            <h1 className="frontTitle">Welcome to tracker!</h1>

            <div className="inputContainer">
                <p className="tightText">What should we call you?</p>
                <input type="text" className="input" placeholder="Jade Isel" />
            </div>

            <div className="container">
                <Link to="/registration-email">
                    <button className="button button-small">Next</button>
                </Link>
            </div>
        </div>
        
    );
};

export default RegistrationName;