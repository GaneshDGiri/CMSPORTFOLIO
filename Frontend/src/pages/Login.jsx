import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/admin');
    } catch (err) { setError('Invalid username or password'); }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">Admin Login</h2>
      {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-300">Username</label>
          <input 
            required 
            type="text" 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
            className="w-full px-4 py-2 border rounded-lg bg-white text-gray-900 dark:bg-gray-900 dark:border-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-colors" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-300">Password</label>
          <input 
            required 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            className="w-full px-4 py-2 border rounded-lg bg-white text-gray-900 dark:bg-gray-900 dark:border-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-colors" 
          />
        </div>
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors">
          Login
        </button>
      </form>
    </div>
  );
}