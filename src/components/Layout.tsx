import React from 'react';
import { Shield, Menu, X, Activity, AlertTriangle, Network, FileText, BarChart3, Settings, Zap, User, LogOut, CreditCard } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useSubscription } from '../hooks/useSubscription';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { user, signOut } = useAuth();
  const { subscription, hasPurchased } = useSubscription();

  const navigation = [
    { id: 'dashboard', name: 'SOC Dashboard', icon: Activity },
    { id: 'threats', name: 'Threat Intel', icon: AlertTriangle },
    { id: 'network', name: 'Network Monitor', icon: Network },
    { id: 'incidents', name: 'Incidents', icon: FileText },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center transform rotate-3d animate-pulse shadow-lg shadow-blue-500/50">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute inset-0 w-10 h-10 border-2 border-blue-400/30 rounded-lg animate-spin"></div>
                  <div className="absolute inset-1 w-8 h-8 border border-cyan-300/20 rounded-lg animate-spin" style={{ animationDirection: 'reverse' }}></div>
                </div>
                <div className="ml-3">
                  <span className="text-xl font-bold text-white">HomeLab SIEM</span>
                  <div className="text-xs text-blue-400 font-medium">AI Security Operations Center</div>
                </div>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25 border border-blue-400/30'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50 border border-transparent hover:border-slate-600/30'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </button>
                );
              })}
              
              {/* User Menu */}
              <div className="flex items-center space-x-3">
                {/* Subscription Status */}
                {hasPurchased && subscription && (
                  <div className="flex items-center space-x-2 px-3 py-2 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm font-medium">Pro Access</span>
                  </div>
                )}
                
                {/* User Info */}
                <div className="flex items-center space-x-2 px-3 py-2 bg-slate-800/50 border border-slate-600/30 rounded-lg">
                  <User className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300 text-sm">{user?.email}</span>
                </div>
                
                {/* Pricing Link */}
                {!hasPurchased && (
                  <button
                    onClick={() => window.location.href = '/pricing'}
                    className="flex items-center px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Upgrade
                  </button>
                )}
                
                {/* Sign Out */}
                <button
                  onClick={handleSignOut}
                  className="flex items-center px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent hover:border-slate-600/30 rounded-lg transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-300 hover:text-white p-2"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-slate-700/50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onTabChange(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center w-full px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                      activeTab === item.id
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </button>
                );
              })}
              
              {/* Mobile User Section */}
              <div className="border-t border-slate-700/50 pt-3 mt-3">
                <div className="px-3 py-2">
                  <div className="text-slate-400 text-sm">{user?.email}</div>
                  {hasPurchased && subscription && (
                    <div className="text-green-400 text-xs mt-1">Pro Access Active</div>
                  )}
                </div>
                
                {!hasPurchased && (
                  <button
                    onClick={() => window.location.href = '/pricing'}
                    className="w-full flex items-center px-3 py-2 text-purple-400 hover:text-purple-300 font-medium transition-colors"
                  >
                    <CreditCard className="w-4 h-4 mr-3" />
                    Upgrade to Pro
                  </button>
                )}
                
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center px-3 py-2 text-slate-400 hover:text-white transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Floating Security Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* 3D Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: 'perspective(1000px) rotateX(60deg)',
          transformOrigin: 'center bottom'
        }}></div>
      </div>
    </div>
  );
};

export default Layout;