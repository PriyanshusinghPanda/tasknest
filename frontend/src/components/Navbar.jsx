import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gray-800">
            Task Manager
          </Link>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-600">Welcome, {user.username}</span>
                <button
                  onClick={logout}
                  className="btn btn-secondary"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 