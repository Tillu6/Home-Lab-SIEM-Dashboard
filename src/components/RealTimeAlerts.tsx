import React, { useState, useEffect } from 'react';
import { Bell, AlertTriangle, Info, CheckCircle, X } from 'lucide-react';

interface Alert {
  id: number;
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  dismissed: boolean;
}

const RealTimeAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const generateAlert = () => {
      const alertTypes = ['critical', 'warning', 'info', 'success'] as const;
      const titles = {
        critical: ['Security Breach Detected', 'System Compromise', 'Data Exfiltration Alert'],
        warning: ['Suspicious Activity', 'Unusual Traffic Pattern', 'Failed Login Attempts'],
        info: ['System Update', 'Maintenance Scheduled', 'New Device Connected'],
        success: ['Threat Blocked', 'System Secured', 'Backup Completed']
      };
      const messages = {
        critical: ['Immediate action required', 'Multiple systems affected', 'Containment protocols activated'],
        warning: ['Monitor closely', 'Investigate further', 'Review security logs'],
        info: ['No action required', 'For your information', 'Routine notification'],
        success: ['All systems secure', 'Operation completed', 'No threats detected']
      };

      const type = alertTypes[Math.floor(Math.random() * alertTypes.length)];
      const title = titles[type][Math.floor(Math.random() * titles[type].length)];
      const message = messages[type][Math.floor(Math.random() * messages[type].length)];

      return {
        id: Date.now() + Math.random(),
        type,
        title,
        message,
        timestamp: new Date(),
        dismissed: false
      };
    };

    // Add initial alerts
    setAlerts([
      generateAlert(),
      generateAlert(),
      generateAlert()
    ]);

    // Generate new alerts periodically
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 3 seconds
        setAlerts(prev => [generateAlert(), ...prev.slice(0, 9)]); // Keep only 10 most recent
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const dismissAlert = (id: number) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, dismissed: true } : alert
    ));
    
    // Remove dismissed alert after animation
    setTimeout(() => {
      setAlerts(prev => prev.filter(alert => alert.id !== id));
    }, 300);
  };

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'critical': return AlertTriangle;
      case 'warning': return AlertTriangle;
      case 'info': return Info;
      case 'success': return CheckCircle;
    }
  };

  const getAlertColors = (type: Alert['type']) => {
    switch (type) {
      case 'critical': return {
        bg: 'bg-red-500/10',
        border: 'border-red-500/30',
        text: 'text-red-400',
        icon: 'text-red-400'
      };
      case 'warning': return {
        bg: 'bg-yellow-500/10',
        border: 'border-yellow-500/30',
        text: 'text-yellow-400',
        icon: 'text-yellow-400'
      };
      case 'info': return {
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/30',
        text: 'text-blue-400',
        icon: 'text-blue-400'
      };
      case 'success': return {
        bg: 'bg-green-500/10',
        border: 'border-green-500/30',
        text: 'text-green-400',
        icon: 'text-green-400'
      };
    }
  };

  const activeAlerts = alerts.filter(alert => !alert.dismissed);

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center">
          <Bell className="w-5 h-5 mr-2 text-blue-400" />
          Real-time Alerts
          {activeAlerts.length > 0 && (
            <span className="ml-2 px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">
              {activeAlerts.length}
            </span>
          )}
        </h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-sm">Live</span>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activeAlerts.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <p className="text-slate-400">No active alerts</p>
            <p className="text-slate-500 text-sm">All systems operating normally</p>
          </div>
        ) : (
          activeAlerts.map((alert) => {
            const Icon = getAlertIcon(alert.type);
            const colors = getAlertColors(alert.type);
            
            return (
              <div
                key={alert.id}
                className={`${colors.bg} ${colors.border} border rounded-lg p-4 transition-all duration-300 transform hover:scale-[1.02] ${
                  alert.dismissed ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <Icon className={`w-5 h-5 ${colors.icon} mt-0.5 flex-shrink-0`} />
                    <div className="flex-1">
                      <h3 className={`font-medium ${colors.text}`}>{alert.title}</h3>
                      <p className="text-slate-300 text-sm mt-1">{alert.message}</p>
                      <p className="text-slate-500 text-xs mt-2">
                        {alert.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="text-slate-400 hover:text-white transition-colors p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RealTimeAlerts;