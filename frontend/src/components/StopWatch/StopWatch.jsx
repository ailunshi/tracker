// set up stopwatch component to insert into tracker.jsx

import { useState, useEffect } from 'react';
import { ControlButtons } from './ControlButtons.jsx';
import CSRFToken from '../CSRFToken.jsx';

export const Stopwatch = () => {
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [time, setTime] = useState(0);
    const [sessionID, setSessionID] = useState(null);
    const [startCount, setStartCount] = useState(0);
    const [endCount, setEndCount] = useState(0);

    useEffect(() => {
        let interval = null;

        if (isActive && !isPaused) {
            interval = setInterval(() => {
                setTime(currentTime => currentTime + 1000);
            }, 1000);
        } else if (!isActive && !isPaused) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive, isPaused]);

    const handleStart = async () => {
        const csrftoken = await CSRFToken();

        const res = await fetch('http://localhost:8000/writingsession/start/', {
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                credentials: 'include',
            });

        if (!res.ok) {
            console.error("Request failed with status", res.status);
            return;
        }

        const data = await res.json();
        setSessionID(data.session_id);
        setStartCount(data.start_count);

        // This section for maintaining stopwatch on frontend
        setIsActive(true);
        setIsPaused(false);
    };

    const handlePauseResume = () => {
        // need to set pause/resume functionality on backend

        setIsPaused(!isPaused);
    };

    const handleReset = async () => {
        const csrftoken = await CSRFToken();
        // Send response to backend to end the writing session
        const res = await fetch('http://localhost:8000/writingsession/stop/', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ session_id: sessionID }),
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
        });

        if (!res.ok) {
            console.error("Request failed with status", res.status);
            return;
        }

        const data = await res.json();
        setEndCount(data.end_count);

        // Set frontend stopwatch to initial state
        setIsActive(false);
        setIsPaused(true);
        setTime(0);
    };

    return (
        <div className="stopwatch">
            <Timer time={time}/>
            <ControlButtons
                active={isActive}
                isPaused={isPaused}
                handleStart={handleStart}
                handlePauseResume={handlePauseResume}
                handleReset={handleReset}
            />
            
            <p>Words at start: { startCount } </p>
            <p>Words at end: { endCount } </p>

        </div>
    );
};

const Timer = (props) => {
    return (
        <div className="digits-container">
            <span className="digits">
                {("0" + Math.floor((props.time / 3600000) % 24)).slice(-2)}:
            </span>
            <span className="digits">
                {("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:
            </span>
            <span className="digits">
                {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}
            </span>
        </div>
    );
}
