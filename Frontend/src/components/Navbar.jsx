import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Settings, LogOut, Download } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getPath = (id) => (location.pathname === '/' ? id : `/${id}`);
  const navLinkClass = "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition text-sm lg:text-base";

  return (
    <nav className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400 shrink-0">
            Ganesh's Portfolio
          </Link>
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <a href={getPath("#profile")} className={navLinkClass}>Profile</a>
            <a href={getPath("#projects")} className={navLinkClass}>Projects</a>
            <a href={getPath("#education")} className={navLinkClass}>Education</a>
            <a href={getPath("#experience")} className={navLinkClass}>Experience</a>
            <a href={getPath("#contact")} className={navLinkClass}>
              {user ? "Admin Panel" : "Contact"}
            </a>
            <a href="/resume.pdf" target="_blank" download="Ganesh_Resume.pdf" className="flex items-center gap-1 ml-2 px-3 py-1.5 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition shadow-sm">
              <Download size={16} /> Resume
            </a>
          </div>
          <div className="flex items-center space-x-3 shrink-0">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="hidden sm:block text-sm font-medium dark:text-gray-200">
                  Hi, {user.name ? user.name.split(' ')[0] : 'Admin'}
                </span>
                <button onClick={handleLogout} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="p-2 text-gray-400 hover:text-blue-600 dark:hover:bg-gray-700 rounded-full transition">
                <Settings size={20} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}