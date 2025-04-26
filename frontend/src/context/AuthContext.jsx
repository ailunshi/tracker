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
            const response = await fetch('http://localhost:8000/api/csrf/', {
                credentials: 'include', // ✅ This sets the session cookie
            });
            const data = await response.json();
            return data.csrfToken; // ✅ Return the CSRF token
        } catch (error) {
            console.error('Error fetching CSRF token:', error);
        }
    };

    const login = async (username, password) => {
        try {
            const csrfToken = await getCsrfToken(); // ✅ First get CSRF token
    
            const response = await fetch('http://localhost:8000/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken, // ✅ Send CSRF token here
                },
                credentials: 'include', // ✅ Include session cookie
                body: JSON.stringify({ username, password }),
            });
    
            if (!response.ok) {
                throw new Error('Login failed');
            }
    
            setIsAuthenticated(true);
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