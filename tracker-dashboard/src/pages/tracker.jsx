import { Link } from 'react-router-dom'
import { useState } from 'react'

const Tracker = () => {
    return (
        <div>
            <h1 className="frontTitle">Writing Productivity Tracker</h1>
            <div className="container">
                <button className="button button-big">Start Tracker</button>
                <div className="vertical-divider"></div>
                <button className="button button-big">Stop Tracker</button>
            </div>
        </div>
    )
}

export default Tracker;