import React, { useState, useEffect } from 'react';
import { Network, Activity, Wifi, Server, AlertTriangle, TrendingUp, Play, Pause, RotateCcw, Settings } from 'lucide-react';
import { useRealTimeData } from '../hooks/useRealTimeData';

const NetworkMonitoring: React.FC = () => {
  const { devices, dataService } = useRealTimeData();
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [networkData, setNetworkData] = useState<any>({
    bandwidth: { in: 0, out: 0 },
    connections: 0,
    packets: 0
  });

  useEffect(() => {
    const updateNetworkData = () => {
      setNetworkData({
        bandwidth: {
          in: Math.random() * 100,
          out: Math.random() * 80
        },
        connections: Math.floor(Math.random() * 500) + 200,
        packets: Math.floor(Math.random() * 10000) + 5000
      });
    };

    updateNetworkData();
    const interval = setInterval(updateNetworkData, 2000);
    return () => clearInterval(interval);
  }, []);

  const trafficAnalysis = [
    { protocol: 'HTTP/HTTPS', percentage: 45, color: 'blue' },
    { protocol: 'SSH', percentage: 15, color: 'green' },
    { protocol: 'DNS', percentage: 12, color: 'purple' },
    { protocol: 'FTP', percentage: 8, color: 'orange' },
    { protocol: 'Other', percentage: 20, color: 'gray' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400 bg-green-500/10';
      case 'warning': return 'text-yellow-400 bg-yellow-500/10';
      case 'critical': return 'text-red-400 bg-red-500/10';
      case 'offline': return 'text-red-400 bg-red-500/10';
      default: return 'text-slate-400 bg-slate-500/10';
    }
  };

  const getProtocolColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-500';
      case 'green': return 'bg-green-500';
      case 'purple': return 'bg-purple-500';
      case 'orange': return 'bg-orange-500';
      default: return 'bg-slate-500';
    }
  };

  const handleDeviceAction = (deviceId: string, action: string) => {
    switch (action) {
      case 'restart':
        console.log(`Restarting device: ${deviceId}`);
        // In real implementation, this would call device management APIs
        break;
      case 'quarantine':
        dataService.quarantineDevice(deviceId);
        break;
      case 'configure':
        setSelectedDevice(deviceId);
        break;
      default:
        break;
    }
  };

  const maxBandwidth = Math.max(networkData.bandwidth.in, networkData.bandwidth.out);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Network Monitoring
        </h1>
        <p className="text-xl text-slate-400">
          Real-time network traffic analysis and device monitoring
        </p>
      </div>

      {/* Network Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-blue-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-sm font-medium">Bandwidth In</p>
              <p className="text-2xl font-bold text-white">{networkData.bandwidth.in.toFixed(1)} Mbps</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-400" />
          </div>
          <div className="mt-3 w-full bg-slate-700 rounded-full h-2">
            <div
              className="h-2 rounded-full bg-blue-500 transition-all duration-1000"
              style={{ width: `${(networkData.bandwidth.in / 100) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-green-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm font-medium">Bandwidth Out</p>
              <p className="text-2xl font-bold text-white">{networkData.bandwidth.out.toFixed(1)} Mbps</p>
            </div>
            <Activity className="w-8 h-8 text-green-400" />
          </div>
          <div className="mt-3 w-full bg-slate-700 rounded-full h-2">
            <div
              className="h-2 rounded-full bg-green-500 transition-all duration-1000"
              style={{ width: `${(networkData.bandwidth.out / 100) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-purple-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-400 text-sm font-medium">Active Connections</p>
              <p className="text-2xl font-bold text-white">{networkData.connections.toLocaleString()}</p>
            </div>
            <Network className="w-8 h-8 text-purple-400" />
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-orange-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-400 text-sm font-medium">Network Devices</p>
              <p className="text-2xl font-bold text-white">{devices.length}</p>
            </div>
            <Server className="w-8 h-8 text-orange-400" />
          </div>
        </div>
      </div>

      {/* Network Topology and Traffic Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Network Topology */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <Network className="w-5 h-5 mr-2 text-blue-400" />
            Network Topology
          </h2>
          
          {/* 3D Network Visualization */}
          <div className="relative h-80 bg-gradient-to-br from-slate-900/50 to-blue-900/20 rounded-lg border border-slate-600/30 overflow-hidden">
            <svg viewBox="0 0 400 300" className="w-full h-full">
              {/* Network connections */}
              <defs>
                <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
                  <stop offset="100%" stopColor="rgba(147, 51, 234, 0.3)" />
                </linearGradient>
              </defs>
              
              {/* Core network lines */}
              <line x1="200" y1="150" x2="100" y2="80" stroke="url(#connectionGradient)" strokeWidth="2" className="animate-pulse" />
              <line x1="200" y1="150" x2="300" y2="80" stroke="url(#connectionGradient)" strokeWidth="2" className="animate-pulse" />
              <line x1="200" y1="150" x2="100" y2="220" stroke="url(#connectionGradient)" strokeWidth="2" className="animate-pulse" />
              <line x1="200" y1="150" x2="300" y2="220" stroke="url(#connectionGradient)" strokeWidth="2" className="animate-pulse" />
              <line x1="200" y1="150" x2="350" y2="150" stroke="url(#connectionGradient)" strokeWidth="2" className="animate-pulse" />
              
              {/* Central router */}
              <circle cx="200" cy="150" r="20" fill="rgba(34, 197, 94, 0.2)" stroke="rgb(34, 197, 94)" strokeWidth="2" className="animate-pulse" />
              <text x="200" y="155" textAnchor="middle" fill="white" fontSize="10">Core</text>
              
              {/* Network devices */}
              <circle cx="100" cy="80" r="15" fill="rgba(59, 130, 246, 0.2)" stroke="rgb(59, 130, 246)" strokeWidth="2" />
              <text x="100" y="85" textAnchor="middle" fill="white" fontSize="8">SW1</text>
              
              <circle cx="300" cy="80" r="15" fill="rgba(59, 130, 246, 0.2)" stroke="rgb(59, 130, 246)" strokeWidth="2" />
              <text x="300" y="85" textAnchor="middle" fill="white" fontSize="8">SW2</text>
              
              <circle cx="100" cy="220" r="15" fill="rgba(168, 85, 247, 0.2)" stroke="rgb(168, 85, 247)" strokeWidth="2" />
              <text x="100" y="225" textAnchor="middle" fill="white" fontSize="8">AP1</text>
              
              <circle cx="300" cy="220" r="15" fill="rgba(168, 85, 247, 0.2)" stroke="rgb(168, 85, 247)" strokeWidth="2" />
              <text x="300" y="225" textAnchor="middle" fill="white" fontSize="8">AP2</text>
              
              <circle cx="350" cy="150" r="15" fill="rgba(239, 68, 68, 0.2)" stroke="rgb(239, 68, 68)" strokeWidth="2" />
              <text x="350" y="155" textAnchor="middle" fill="white" fontSize="8">FW</text>
              
              {/* Data flow animation */}
              <circle r="3" fill="rgba(59, 130, 246, 0.8)">
                <animateMotion dur="3s" repeatCount="indefinite">
                  <path d="M200,150 L100,80 L300,80 L300,220 L100,220 L200,150" />
                </animateMotion>
              </circle>
            </svg>
          </div>
        </div>

        {/* Traffic Analysis */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-green-400" />
            Traffic Analysis
          </h2>
          
          <div className="space-y-4">
            {trafficAnalysis.map((traffic, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">{traffic.protocol}</span>
                  <span className="text-slate-400">{traffic.percentage}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${getProtocolColor(traffic.color)} transition-all duration-1000`}
                    style={{ width: `${traffic.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-slate-700/30 rounded-lg">
            <h3 className="text-white font-medium mb-2">Real-time Metrics</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-400">Packets/sec:</span>
                <span className="text-white ml-2 font-mono">{networkData.packets.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-slate-400">Latency:</span>
                <span className="text-green-400 ml-2 font-mono">12ms</span>
              </div>
              <div>
                <span className="text-slate-400">Packet Loss:</span>
                <span className="text-green-400 ml-2 font-mono">0.02%</span>
              </div>
              <div>
                <span className="text-slate-400">Jitter:</span>
                <span className="text-green-400 ml-2 font-mono">2ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Device Status Table */}
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 overflow-hidden">
        <div className="p-6 border-b border-slate-700/50">
          <h2 className="text-xl font-bold text-white">Network Devices</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/30">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Device</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">IP Address</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">CPU Load</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Memory</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Uptime</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {devices.map((device) => (
                <tr key={device.id} className="hover:bg-slate-700/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Server className="w-5 h-5 text-blue-400 mr-3" />
                      <div>
                        <span className="text-white font-medium">{device.name}</span>
                        <div className="text-xs text-slate-400">{device.vendor} {device.model}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-300 font-mono">{device.ip}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-300">{device.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(device.status)}`}>
                      {device.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-16 bg-slate-700 rounded-full h-2 mr-3">
                        <div
                          className={`h-2 rounded-full transition-all duration-1000 ${
                            device.cpu > 80 ? 'bg-red-500' :
                            device.cpu > 60 ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${device.cpu}%` }}
                        ></div>
                      </div>
                      <span className="text-white text-sm">{Math.round(device.cpu)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-16 bg-slate-700 rounded-full h-2 mr-3">
                        <div
                          className={`h-2 rounded-full transition-all duration-1000 ${
                            device.memory > 80 ? 'bg-red-500' :
                            device.memory > 60 ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${device.memory}%` }}
                        ></div>
                      </div>
                      <span className="text-white text-sm">{Math.round(device.memory)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-300 text-sm">
                      {Math.floor(device.uptime / 86400)}d {Math.floor((device.uptime % 86400) / 3600)}h
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleDeviceAction(device.id, 'configure')}
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeviceAction(device.id, 'restart')}
                        className="text-green-400 hover:text-green-300 text-sm font-medium transition-colors"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeviceAction(device.id, 'quarantine')}
                        className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                      >
                        <Pause className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Device Configuration Modal */}
      {selectedDevice && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Device Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Device Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white"
                  defaultValue={devices.find(d => d.id === selectedDevice)?.name}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Location</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white"
                  defaultValue={devices.find(d => d.id === selectedDevice)?.location}
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => setSelectedDevice(null)}
                  className="flex-1 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setSelectedDevice(null)}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkMonitoring;