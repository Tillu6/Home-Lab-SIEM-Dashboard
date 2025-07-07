import React, { useState } from 'react';
import { AlertTriangle, Shield, TrendingUp, Eye, Search, Filter, Download } from 'lucide-react';

const ThreatIntelligence: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const threatData = [
    {
      id: 1,
      name: 'APT-2024-001',
      type: 'Advanced Persistent Threat',
      severity: 'Critical',
      confidence: 95,
      firstSeen: '2024-01-15',
      lastSeen: '2024-01-20',
      indicators: ['malware.exe', '192.168.1.100', 'evil.com'],
      description: 'Sophisticated malware campaign targeting financial institutions',
      mitre: ['T1055', 'T1082', 'T1083'],
      status: 'Active'
    },
    {
      id: 2,
      name: 'PHISH-2024-002',
      type: 'Phishing Campaign',
      severity: 'High',
      confidence: 88,
      firstSeen: '2024-01-18',
      lastSeen: '2024-01-20',
      indicators: ['phishing-site.tk', 'fake-bank.ml'],
      description: 'Large-scale phishing campaign impersonating major banks',
      mitre: ['T1566.002', 'T1204.002'],
      status: 'Monitoring'
    },
    {
      id: 3,
      name: 'BOTNET-2024-003',
      type: 'Botnet Activity',
      severity: 'Medium',
      confidence: 76,
      firstSeen: '2024-01-10',
      lastSeen: '2024-01-19',
      indicators: ['bot.command.com', '203.45.67.89'],
      description: 'Botnet infrastructure used for cryptocurrency mining',
      mitre: ['T1496', 'T1071.001'],
      status: 'Contained'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Threats', count: threatData.length },
    { id: 'apt', name: 'APT', count: 1 },
    { id: 'phishing', name: 'Phishing', count: 1 },
    { id: 'botnet', name: 'Botnet', count: 1 },
    { id: 'malware', name: 'Malware', count: 0 }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'text-red-400 bg-red-500/10 border-red-500/30';
      case 'High': return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      default: return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-red-400 bg-red-500/10';
      case 'Monitoring': return 'text-yellow-400 bg-yellow-500/10';
      case 'Contained': return 'text-green-400 bg-green-500/10';
      default: return 'text-slate-400 bg-slate-500/10';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Threat Intelligence Center
        </h1>
        <p className="text-xl text-slate-400">
          Advanced threat analysis and intelligence gathering
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-red-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-400 text-sm font-medium">Active Threats</p>
              <p className="text-2xl font-bold text-white">23</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-blue-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-sm font-medium">IOCs Tracked</p>
              <p className="text-2xl font-bold text-white">1,247</p>
            </div>
            <Eye className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-green-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm font-medium">Mitigated</p>
              <p className="text-2xl font-bold text-white">156</p>
            </div>
            <Shield className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-purple-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-400 text-sm font-medium">Confidence Avg</p>
              <p className="text-2xl font-bold text-white">86%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search threats, IOCs, or MITRE techniques..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
            <button className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
            <button className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Threat Intelligence Table */}
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 overflow-hidden">
        <div className="p-6 border-b border-slate-700/50">
          <h2 className="text-xl font-bold text-white">Threat Intelligence Feed</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/30">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Threat</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Severity</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Confidence</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Last Seen</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {threatData.map((threat) => (
                <tr key={threat.id} className="hover:bg-slate-700/20 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-white font-medium">{threat.name}</div>
                      <div className="text-slate-400 text-sm truncate max-w-xs">{threat.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-300">{threat.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(threat.severity)}`}>
                      {threat.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-16 bg-slate-700 rounded-full h-2 mr-3">
                        <div
                          className="h-2 rounded-full bg-blue-500"
                          style={{ width: `${threat.confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-white text-sm">{threat.confidence}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(threat.status)}`}>
                      {threat.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-300 text-sm">
                    {threat.lastSeen}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                        View
                      </button>
                      <button className="text-green-400 hover:text-green-300 text-sm font-medium">
                        Block
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MITRE ATT&CK Mapping */}
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
        <h2 className="text-xl font-bold text-white mb-6">MITRE ATT&CK Techniques</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['T1055 - Process Injection', 'T1082 - System Information Discovery', 'T1566.002 - Spearphishing Link'].map((technique, index) => (
            <div key={index} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
              <div className="text-white font-medium mb-2">{technique}</div>
              <div className="text-slate-400 text-sm">Detected in 2 recent threats</div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-slate-500">Frequency: High</span>
                <button className="text-blue-400 hover:text-blue-300 text-xs">Learn More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThreatIntelligence;