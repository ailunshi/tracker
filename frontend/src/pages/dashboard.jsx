import { useState } from 'react';
import { useEffect } from 'react';

const Dashboard = () => {
    const [user, setUser] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: ''
    });

    const getUserInfo = async () => {
        const response = await fetch('http://localhost:8000/accounts/current_user/', {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user information');
        }

        const { username, first_name, last_name, email } = await response.json();
        setUser({ username, first_name, last_name, email });

        return { username, first_name, last_name, email };
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    console.log('User info:', user);

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

                        <p style={{color: "var(--white)"}}>{ user.first_name } { user.last_name } </p>
                        
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