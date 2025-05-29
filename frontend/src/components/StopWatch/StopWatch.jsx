// set up stopwatch component to insert into tracker.jsx

import { useState, useEffect } from 'react';
import { ControlButtons } from './ControlButtons.jsx';

export const Stopwatch = () => {
    console.log("Stopwatch component rendered");
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

        const res = await fetch('http://localhost:8000/api/writingsession/start', {
            method: 'POST',
            credentials: 'include',
        });
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
        const res = await fetch('http://localhost:8000/api/writingsession/end', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ session_id: sessionID }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        setEndCount(data.end_count);

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
