import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterContext = createContext();

export const RegisterProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const updateFormData = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const validateForm = () => {
        if (!formData.name || !formData.email || !formData.password) {
            setError("All fields are required");
            return false;
        }
        if (!formData.email.includes('@')) {
            setError("Please enter a valid email");
            return false;
        }
        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters");
            return false;
        }
        return true;
    };

    const registerUser = async () => {
        if (!validateForm()) return false;

        try {
            console.log('Starting registration with data:', {
                ...formData,
                password: '***' // Don't log the actual password
            });

            // First get CSRF token
            const csrfResponse = await fetch('http://localhost:8000/api/csrf/', {
                credentials: 'include',
            });
            console.log('CSRF token fetch status:', csrfResponse.status);

            // Get the CSRF token from cookies
            const csrfToken = document.cookie
                .split('; ')
                .find(row => row.startsWith('csrftoken='))
                ?.split('=')[1];

            if (!csrfToken) {
                throw new Error('CSRF token not found');
            }

            // Register the user

            const response = await fetch('http://localhost:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                credentials: 'include',
                body: JSON.stringify({
                    username: formData.email,  // Using email as username
                    email: formData.email,
                    password: formData.password,
                    name: formData.name
                }),
            });

            console.log('Registration response status:', response.status);
            const data = await response.json();
            console.log('Registration response data:', data);

            if (!response.ok) {
                throw new Error(data.error || data.detail || 'Registration failed');
            }

            await login(formData.email, formData.password);
            
            // Clear form data
            setFormData({
                name: "",
                email: "",
                password: "",
            });

            // Navigate to tracker page
            navigate('/tracker');
            return true;
        } catch (error) {
            console.error('Registration error:', error);
            setError(error.message || 'Failed to register. Please try again.');
            return false;
        }
    };

    return (
        <RegisterContext.Provider value={{ 
            formData, 
            updateFormData, 
            registerUser,
            error,
            setError 
        }}>
            {children}
        </RegisterContext.Provider>
    );
};

export const useRegister = () => useContext(RegisterContext);