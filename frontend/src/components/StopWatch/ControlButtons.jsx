export const ControlButtons = (props) => {
    const StartButton = (
        <div 
            className="button button-big"
            onClick={props.handleStart}>
            
            Start Tracker
        </div>
    );

    const ActiveButtons = (
        <div className="controlButton-container">
            <div
                className="button button-big"
                onClick={props.handleReset}>
                End Tracker
            </div>

            <div
                className="button button-big"
                onClick={props.handlePauseResume}>
                    {props.isPaused ? "Resume Tracker" : "Pause Tracker"}
            </div>
        </div>
    );

    return (
            <div>
                {props.active ? ActiveButtons : StartButton}
            </div>
    );
};