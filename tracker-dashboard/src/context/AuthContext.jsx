import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const getCsrfToken = async () => {
        try {
            await fetch('http://localhost:8000/api/csrf/', {
                credentials: 'include',
            });
        } catch (error) {
            console.error('Error fetching CSRF token:', error);
        }
    };

    const login = async (username, password) => {
        try {
            // First get CSRF token
            await getCsrfToken();

            const response = await fetch('http://localhost:8000/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            setIsAuthenticated(true);
            // Fetch user data after successful login
            await fetchUserData();
            return true;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await fetch('http://localhost:8000/api/logout/', {
                method: 'POST',
                credentials: 'include',
            });
            setIsAuthenticated(false);
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const fetchUserData = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/user/', {
                credentials: 'include',
            });
            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    // Check authentication status when component mounts
    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <AuthContext.Provider value={{ 
            isAuthenticated, 
            user, 
            login, 
            logout,
            fetchUserData 
        }}>
            {children}
        </AuthContext.Provider>
    );
}; 