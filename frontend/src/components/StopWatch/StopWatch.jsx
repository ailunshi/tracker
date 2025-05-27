// set up stopwatch component to insert into tracker.jsx

import { useState, useEffect } from 'react';
import { ControlButtons } from './ControlButtons.jsx';

export const Stopwatch = () => {
    console.log("Stopwatch component rendered");
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [time, setTime] = useState(0);

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

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    };

    const handlePauseResume = () => {
        setIsPaused(!isPaused);
    };

    const handleReset = () => {
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
