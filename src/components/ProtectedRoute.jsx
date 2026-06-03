import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, requireAdmin }) {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  
  if (!user) {
    return <Navigate to="/login" replace />;
  }


  if (requireAdmin && user.role !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }

  
  return children;
}

export default ProtectedRoute;