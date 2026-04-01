import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Lock, User, ArrowLeft, Info } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/'); 
    } catch (err) {
      setError('Invalid admin credentials');
    }
  };

  const inputClasses = "w-full pl-10 pr-4 py-2 border rounded-lg bg-white text-gray-900 dark:bg-gray-900 dark:border-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-colors";

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
        <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 mb-6 transition">
          <ArrowLeft size={16} className="mr-1" /> Back to Portfolio
        </Link>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold dark:text-white">Admin Portal</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Sign in as <strong>Gani</strong></p>
        </div>
        {error && (
          <div className="mb-6 p-3 bg-red-100 border border-red-200 text-red-600 text-sm rounded-lg text-center font-medium">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={20} />
            <input required type="text" placeholder="Username (Gani)" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClasses} />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClasses} />
            <div className="mt-2 flex items-center gap-1 text-xs text-blue-500 dark:text-blue-400 italic">
              <Info size={12} />
              <span>Hint: Gani@30...</span>
            </div>
          </div>
          <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition shadow-lg">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}