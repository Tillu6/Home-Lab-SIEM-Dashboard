import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, TrendingUp, Eye, Zap, Globe, Activity, Server, Users, Clock, Cpu, Wifi, Database } from 'lucide-react';
import ThreatMap from './ThreatMap';
import SecurityMetrics from './SecurityMetrics';
import RealTimeAlerts from './RealTimeAlerts';
import { useRealTimeData } from '../hooks/useRealTimeData';

const Dashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { devices, events, threats, isConnected } = useRealTimeData();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate real-time statistics
  const criticalEvents = events.filter(e => e.severity === 'critical').length;
  const highEvents = events.filter(e => e.severity === 'high').length;
  const activeThreats = threats.filter(t => 
    new Date().getTime() - t.lastSeen.getTime() < 3600000 // Last hour
  ).length;
  const onlineDevices = devices.filter(d => d.status === 'online').length;
  const totalDevices = devices.length;
  const avgCpuUsage = devices.reduce((sum, d) => sum + d.cpu, 0) / devices.length;
  const avgMemoryUsage = devices.reduce((sum, d) => sum + d.memory, 0) / devices.length;

  const stats = [
    {
      title: 'Active Threats',
      value: activeThreats.toString(),
      change: `${criticalEvents + highEvents} high priority`,
      icon: AlertTriangle,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-500/10',
      textColor: 'text-red-400',
      borderColor: 'border-red-500/30'
    },
    {
      title: 'Events Today',
      value: events.filter(e => 
        new Date().toDateString() === e.timestamp.toDateString()
      ).length.toString(),
      change: `${events.filter(e => e.status === 'new').length} unresolved`,
      icon: Activity,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-400',
      borderColor: 'border-blue-500/30'
    },
    {
      title: 'Network Health',
      value: `${onlineDevices}/${totalDevices}`,
      change: `${Math.round((onlineDevices/totalDevices) * 100)}% operational`,
      icon: Server,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
      textColor: 'text-green-400',
      borderColor: 'border-green-500/30'
    },
    {
      title: 'System Load',
      value: `${Math.round(avgCpuUsage)}%`,
      change: `Memory: ${Math.round(avgMemoryUsage)}%`,
      icon: Cpu,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      textColor: 'text-purple-400',
      borderColor: 'border-purple-500/30'
    }
  ];

  const systemMetrics = [
    { name: 'CPU Usage', value: Math.round(avgCpuUsage), color: 'blue', icon: Cpu },
    { name: 'Memory', value: Math.round(avgMemoryUsage), color: 'green', icon: Activity },
    { name: 'Network I/O', value: Math.round(Math.random() * 100), color: 'purple', icon: Wifi },
    { name: 'Storage', value: Math.round(Math.random() * 100), color: 'orange', icon: Database }
  ];

  const recentIncidents = events.slice(0, 4).map(event => ({
    id: event.id,
    type: event.type.charAt(0).toUpperCase() + event.type.slice(1),
    severity: event.severity.charAt(0).toUpperCase() + event.severity.slice(1),
    source: event.source,
    time: new Date().getTime() - event.timestamp.getTime() < 60000 ? 
      'Just now' : 
      `${Math.floor((new Date().getTime() - event.timestamp.getTime()) / 60000)} min ago`,
    status: event.status,
    description: event.description
  }));

  return (
    <div className="space-y-8">
      {/* Header with Real-time Clock and Connection Status */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Security Operations Center
          </h1>
          <p className="text-xl text-slate-400">
            Real-time threat detection and incident response
          </p>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-3 mb-2">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
            <span className={`text-sm font-medium ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          <div className="text-2xl font-mono text-white">
            {currentTime.toLocaleTimeString()}
          </div>
          <div className="text-sm text-slate-400">
            {currentTime.toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* 3D Security Center Animation */}
      <div className="flex justify-center mb-8">
        <div className="relative perspective-1000">
          <div className="w-40 h-40 bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center transform rotate-3d animate-float shadow-2xl shadow-blue-500/50 border border-blue-400/30">
            <Shield className="w-20 h-20 text-white" />
          </div>
          <div className="absolute inset-0 w-40 h-40 border-4 border-blue-400/30 rounded-2xl animate-spin"></div>
          <div className="absolute inset-2 w-36 h-36 border-2 border-cyan-300/20 rounded-2xl animate-spin" style={{ animationDirection: 'reverse' }}></div>
          <div className="absolute inset-4 w-32 h-32 border border-blue-200/10 rounded-2xl animate-pulse"></div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border ${stat.borderColor} hover:border-opacity-70 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-900/20"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor} border ${stat.borderColor}`}>
                    <Icon className={`w-6 h-6 ${stat.textColor}`} />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                  </div>
                </div>
                <div>
                  <p className="text-slate-400 text-sm font-medium mb-1">{stat.title}</p>
                  <p className={`text-xs font-medium ${stat.textColor}`}>
                    {stat.change}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Threat Map */}
        <div className="lg:col-span-2">
          <ThreatMap />
        </div>

        {/* System Metrics */}
        <div className="space-y-6">
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-blue-400" />
              System Performance
            </h2>
            <div className="space-y-4">
              {systemMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Icon className="w-4 h-4 mr-2 text-slate-400" />
                        <span className="text-white font-medium">{metric.name}</span>
                      </div>
                      <span className="text-white font-bold">{metric.value}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          metric.color === 'blue' ? 'bg-blue-500' :
                          metric.color === 'green' ? 'bg-green-500' :
                          metric.color === 'purple' ? 'bg-purple-500' :
                          'bg-orange-500'
                        }`}
                        style={{ width: `${metric.value}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <SecurityMetrics />
        </div>
      </div>

      {/* Recent Incidents */}
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
            Recent Security Incidents
          </h2>
          <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
            View All Incidents
          </button>
        </div>
        <div className="space-y-4">
          {recentIncidents.map((incident) => (
            <div
              key={incident.id}
              className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:border-slate-600/50 transition-all duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full animate-pulse ${
                  incident.severity === 'Critical' ? 'bg-red-500' :
                  incident.severity === 'High' ? 'bg-orange-500' :
                  incident.severity === 'Medium' ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`}></div>
                <div>
                  <p className="text-white font-medium">{incident.type}</p>
                  <p className="text-slate-400 text-sm">{incident.description}</p>
                  <p className="text-slate-500 text-xs">Source: {incident.source}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-3">
                  <span className={`text-xs px-2 py-1 rounded ${
                    incident.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                    incident.severity === 'High' ? 'bg-orange-500/20 text-orange-400' :
                    incident.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {incident.severity}
                  </span>
                  <span className={`text-sm font-medium ${
                    incident.status === 'resolved' ? 'text-green-400' :
                    incident.status === 'investigating' ? 'text-yellow-400' :
                    incident.status === 'new' ? 'text-red-400' :
                    'text-orange-400'
                  }`}>
                    {incident.status}
                  </span>
                </div>
                <p className="text-slate-400 text-xs mt-1">{incident.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-time Alerts */}
      <RealTimeAlerts />
    </div>
  );
};

export default Dashboard;