import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import DetectPage from './pages/DetectPage';
import ResearchPage from './pages/ResearchPage';
import ApiPage from './pages/ApiPage';
import AboutPage from './pages/AboutPage';
import PolicyPage from './pages/PolicyPage';
import LoginModal from './components/LoginModal';
import ScrollToTop from './components/ScrollToTop';
import { privacyPolicy, termsOfService, securityCompliance } from './data/policies';

function AppContent() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('deepguard_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('deepguard_user', JSON.stringify(userData));
    setShowLogin(false);
    navigate('/detect');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('deepguard_user');
    navigate('/');
  };

  const handleGetStarted = () => {
    if (user) {
      navigate('/detect');
    } else {
      // Not logged in — show login modal
      setShowLogin(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <ScrollToTop />
      <Navbar
        isAuthenticated={!!user}
        user={user}
        onLoginClick={() => setShowLogin(true)}
        onLogout={handleLogout}
      />

      <Routes>
        <Route
          path="/"
          element={<LandingPage onGetStarted={handleGetStarted} isAuthenticated={!!user} />}
        />
        <Route path="/detect" element={user ? <DetectPage /> : <Navigate to="/" replace />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/api" element={<ApiPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<PolicyPage policy={privacyPolicy} />} />
        <Route path="/terms" element={<PolicyPage policy={termsOfService} />} />
        <Route path="/security" element={<PolicyPage policy={securityCompliance} />} />
      </Routes>

      <Footer />

      {/* Login Modal */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
