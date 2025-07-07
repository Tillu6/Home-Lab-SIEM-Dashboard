import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ThreatIntelligence from './components/ThreatIntelligence';
import NetworkMonitoring from './components/NetworkMonitoring';
import IncidentResponse from './components/IncidentResponse';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import PricingPage from './components/PricingPage';
import SuccessPage from './components/SuccessPage';
import { useAuth } from './hooks/useAuth';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <Router>
        <Routes>
          <Route 
            path="/pricing" 
            element={<PricingPage />} 
          />
          <Route 
            path="*" 
            element={
              authMode === 'login' ? (
                <LoginPage 
                  onSuccess={() => window.location.reload()} 
                  onSwitchToSignup={() => setAuthMode('signup')} 
                />
              ) : (
                <SignupPage 
                  onSuccess={() => window.location.reload()} 
                  onSwitchToLogin={() => setAuthMode('login')} 
                />
              )
            } 
          />
        </Routes>
      </Router>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'threats':
        return <ThreatIntelligence />;
      case 'network':
        return <NetworkMonitoring />;
      case 'incidents':
        return <IncidentResponse />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/pricing" 
          element={<PricingPage />} 
        />
        <Route 
          path="/success" 
          element={<SuccessPage />} 
        />
        <Route 
          path="*" 
          element={
            <Layout activeTab={activeTab} onTabChange={setActiveTab}>
              {renderContent()}
            </Layout>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;