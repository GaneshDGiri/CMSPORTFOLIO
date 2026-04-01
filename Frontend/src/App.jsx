import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AdminLogin from './pages/AdminLogin';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AdminLogin />} />
        </Routes>
      </main>
    </div>
  );
}
