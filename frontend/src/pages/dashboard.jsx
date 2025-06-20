import { useState } from 'react';

const Dashboard = () => {
    return (

        <div className="login-container"> {/*ie. container for the whole thing*/}
            
            <div className="sidebar"> 
                <h1 className="home-logo">writing tracker</h1>
                
                <a href="#">HOME</a>
                
                <a href="#">PROJECTS</a>

                <div className="dropdown-container">
                    <button className="button button-new-project">New Project +</button>

                    <div className="project-list">
                        <ul>
                            <li>Project 1</li>
                            <li>Project 2</li>
                            <li>Project 3</li>
                            <li>Project 4</li>
                            <li>Project 5</li>
                        </ul>
                    </div>
                        
                </div>
                    {/* need a dropdown for individual projects 
                    
                    this would need to be a model with ORM to writing sessions
                    (ie. one project can have multiple sessions)*/}
                

            </div>

            <div className="main-content"> {/*ie. container for the main content*/}

                <div className="header-container"> {/*ie. top header bar*/}

                    <div className="profile-header"> {/*ie. user profile icon*/}

                        <p style={{color: "var(--white)"}}>USER NAME IS HERE</p>
                        
                    </div>

                </div>

                <div> {/*ie. the actual dashboard with charts and stats
                    component: WEEK/DAY toggle + either the current week 
                                w/ the current date w/corresponding data and chart

                    
                
                    */}

                </div>

            </div>

        </div>
    );
};

export default Dashboard;