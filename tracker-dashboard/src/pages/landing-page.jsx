import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <h1 className="frontTitle">Writing Productivity Tracker</h1>

            <div className="container">
                <Link to="login">
                <button className="button button-big">Log In</button>
                </Link>
                <div className="vertical-divider"></div>
                <Link to="/registration-name">
                    <button className="button button-big">Register</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;