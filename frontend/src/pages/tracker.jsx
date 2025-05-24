import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const Tracker = () => {
    const { logout } = useAuth();

    return (
        <div className="landing-page-container">
            <h1 className="frontTitle">Writing Productivity Tracker</h1>

            <div className="container-horizontal">
                <button className="button button-big">Start Tracker</button>
                <div className="vertical-divider"></div>
                <button className="button button-big">Stop Tracker</button>
            </div>

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

    )
}

export default Tracker;