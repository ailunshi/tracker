import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    console.log("PrivateRoute isAuthenticated:", isAuthenticated);

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
