import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Stopwatch } from '../components/Stopwatch/Stopwatch.jsx'

const Tracker = () => {
    const { logout } = useAuth();

    {/*
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [wordStart, setWordState] = useState(0);
    const [wordEnd, setWordEnd] = useState(0);

    const startTracker = async () => {
        { Stopwatch }
        const res = await fetch('http://localhost:8000/api/tracker/start/', {
            method: 'POST',
            credentials: 'include'
        });
        const data = await res.json();
        setStartTime(data.start_time);
        setWordCount(data.word_count);
    }

    const stopTracker = async () => {
        const res = await fetch('http://localhost:8000/api/tracker/start/', {
            method: 'POST',
            credentials: 'include'
        });
        const data = await res.json();
        setEndTime(data.start_time);
        setEndCount(data.word_count);
    }

    const elapsedTime = startTime && endTime ? Math.round(endTime - startTime) : null;
    const wordDelta = wordStart && wordEnd ? wordEnd - wordState : null;
*/}
    return (
        <div className="landing-page-container">
            <h1 className="frontTitle">Writing Productivity Tracker</h1>

            <Stopwatch/>

{/*}
            <div className="container-horizontal">
                <button 
                    className="button button-big"
                    onClick={startTracker}
                >
                    Start Tracker
                </button>

                <div className="vertical-divider"></div>

                <button
                    className="button button-big"
                    onClick={stopTracker}
                >
                    Stop Tracker
                </button>
            </div>*/}

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