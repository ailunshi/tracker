import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Stopwatch } from '../components/StopWatch/Stopwatch.jsx'

const Tracker = () => {
    const { logout } = useAuth();

    return (
        <div className="landing-page-container">
            <h1 className="frontTitle">Writing Productivity Tracker</h1>

            <Stopwatch/>

            <div>
                <Link
                    to="/"
                    onClick={(e) => {
                        e.preventDefault(); 
                        logout().then(() => {
                            window.location.href = '/';
                        });
                    }}
                    className="topRight"
                    style={{
                        color: "var(--urgent-indigo)",
                        fontWeight: "bold",
                        textDecorationLine: "underline"
                    }}
                >
                    Sign Out
                </Link>
            </div>
        </div>

    );
};

export default Tracker;