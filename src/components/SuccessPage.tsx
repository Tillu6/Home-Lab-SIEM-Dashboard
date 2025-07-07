import React, { useEffect, useState } from 'react';
import { CheckCircle, Download, ArrowRight, Shield, Star } from 'lucide-react';
import { useSubscription } from '../hooks/useSubscription';

const SuccessPage: React.FC = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const { subscription, isLoading } = useSubscription();

  useEffect(() => {
    // Hide confetti after 3 seconds
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 w-full max-w-2xl">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 shadow-2xl text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-400 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50 animate-pulse">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
          </div>

          {/* Header */}
          <h1 className="text-4xl font-bold text-white mb-4">
            🎉 Payment Successful!
          </h1>
          <p className="text-xl text-slate-400 mb-8">
            Welcome to the Home Lab SIEM Dashboard! Your purchase has been completed successfully.
          </p>

          {/* Subscription Status */}
          {!isLoading && subscription && (
            <div className="mb-8 p-6 bg-green-500/10 border border-green-500/30 rounded-xl">
              <div className="flex items-center justify-center mb-3">
                <Shield className="w-6 h-6 text-green-400 mr-2" />
                <span className="text-green-400 font-medium text-lg">Access Granted</span>
              </div>
              <p className="text-green-300">
                You now have lifetime access to all features and future updates.
              </p>
            </div>
          )}

          {/* What's Next */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">What's Next?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-700/30 rounded-xl border border-slate-600/30">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Download className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-white font-medium mb-2">Access Your Dashboard</h3>
                <p className="text-slate-400 text-sm">
                  Start monitoring your home lab security with real-time threat detection.
                </p>
              </div>
              <div className="p-6 bg-slate-700/30 rounded-xl border border-slate-600/30">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Star className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-white font-medium mb-2">Setup Guide</h3>
                <p className="text-slate-400 text-sm">
                  Follow our comprehensive setup guide to configure your SIEM dashboard.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => window.location.href = '/'}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center text-lg"
            >
              Access Dashboard
              <ArrowRight className="ml-3 w-5 h-5" />
            </button>
            
            <button
              onClick={() => window.open('https://github.com/Tillu6/Home-Lab-SIEM-Dashboard', '_blank')}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center"
            >
              <Download className="mr-2 w-4 h-4" />
              Download Source Code
            </button>
          </div>

          {/* Support */}
          <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-blue-300 text-sm">
              Need help getting started? Check out our{' '}
              <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                documentation
              </a>{' '}
              or{' '}
              <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                contact support
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;