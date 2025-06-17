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
            await fetch('http://localhost:8000/accounts/csrf_cookie/', {
                credentials: 'include', 
            });
            
            const csrfToken = document.cookie
                .split('; ')
                .find(row => row.startsWith('csrftoken='))
                ?.split('=')[1];

                return csrfToken;
        } catch (error) {
            console.error('Error fetching CSRF token:', error);
        }
    };

    const login = async (username, password) => {
        try {
            const csrfToken = await getCsrfToken();
    
            const response = await fetch('http://localhost:8000/accounts/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                credentials: 'include',
                body: JSON.stringify({ email: username, password }),
            });

            console.log('login response is :', response);
    
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
            await fetch('http://localhost:8000/accounts/logout/', {
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
            const response = await fetch('http://localhost:8000/accounts/user/', {
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