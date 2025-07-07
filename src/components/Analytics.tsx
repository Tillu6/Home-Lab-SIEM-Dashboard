import React, { useState } from 'react';
import { BarChart3, TrendingUp, PieChart, Activity, Calendar, Download } from 'lucide-react';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const securityMetrics = [
    { name: 'Threats Detected', value: 1247, change: '+12%', trend: 'up' },
    { name: 'Incidents Resolved', value: 156, change: '+8%', trend: 'up' },
    { name: 'Mean Time to Response', value: '8.5m', change: '-15%', trend: 'down' },
    { name: 'False Positive Rate', value: '2.3%', change: '-5%', trend: 'down' }
  ];

  const threatCategories = [
    { name: 'Malware', count: 456, percentage: 36.6, color: 'red' },
    { name: 'Phishing', count: 312, percentage: 25.0, color: 'orange' },
    { name: 'Network Intrusion', count: 234, percentage: 18.8, color: 'yellow' },
    { name: 'Data Exfiltration', count: 156, percentage: 12.5, color: 'purple' },
    { name: 'Other', count: 89, percentage: 7.1, color: 'blue' }
  ];

  const weeklyData = [
    { day: 'Mon', threats: 45, incidents: 8, resolved: 12 },
    { day: 'Tue', threats: 52, incidents: 12, resolved: 15 },
    { day: 'Wed', threats: 38, incidents: 6, resolved: 9 },
    { day: 'Thu', threats: 61, incidents: 15, resolved: 18 },
    { day: 'Fri', threats: 48, incidents: 9, resolved: 11 },
    { day: 'Sat', threats: 29, incidents: 4, resolved: 6 },
    { day: 'Sun', threats: 33, incidents: 5, resolved: 7 }
  ];

  const getColorClass = (color: string) => {
    switch (color) {
      case 'red': return 'bg-red-500';
      case 'orange': return 'bg-orange-500';
      case 'yellow': return 'bg-yellow-500';
      case 'purple': return 'bg-purple-500';
      case 'blue': return 'bg-blue-500';
      default: return 'bg-slate-500';
    }
  };

  const maxThreats = Math.max(...weeklyData.map(d => d.threats));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Security Analytics
          </h1>
          <p className="text-xl text-slate-400">
            Comprehensive security metrics and trend analysis
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {securityMetrics.map((metric, index) => (
          <div key={index} className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-400 text-sm font-medium">{metric.name}</h3>
              <TrendingUp className={`w-4 h-4 ${
                metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
              } ${metric.trend === 'down' && metric.name.includes('Time') ? 'text-green-400' : ''}`} />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-bold text-white">{metric.value}</div>
                <div className={`text-sm font-medium ${
                  (metric.trend === 'up' && !metric.name.includes('Rate') && !metric.name.includes('Time')) ||
                  (metric.trend === 'down' && (metric.name.includes('Rate') || metric.name.includes('Time')))
                    ? 'text-green-400' : 'text-red-400'
                }`}>
                  {metric.change}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Threat Trends Chart */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
              Weekly Threat Trends
            </h2>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                <span className="text-slate-400">Threats</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                <span className="text-slate-400">Incidents</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                <span className="text-slate-400">Resolved</span>
              </div>
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between space-x-2">
            {weeklyData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center space-y-2">
                <div className="w-full flex flex-col items-center space-y-1">
                  {/* Threats Bar */}
                  <div className="w-full bg-slate-700 rounded-t relative">
                    <div
                      className="bg-blue-500 rounded-t transition-all duration-1000"
                      style={{ height: `${(data.threats / maxThreats) * 120}px` }}
                    ></div>
                  </div>
                  {/* Incidents Bar */}
                  <div className="w-full bg-slate-700 relative">
                    <div
                      className="bg-red-500 transition-all duration-1000"
                      style={{ height: `${(data.incidents / maxThreats) * 120}px` }}
                    ></div>
                  </div>
                  {/* Resolved Bar */}
                  <div className="w-full bg-slate-700 rounded-b relative">
                    <div
                      className="bg-green-500 rounded-b transition-all duration-1000"
                      style={{ height: `${(data.resolved / maxThreats) * 120}px` }}
                    ></div>
                  </div>
                </div>
                <span className="text-slate-400 text-xs">{data.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Threat Categories Pie Chart */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-purple-400" />
            Threat Categories
          </h2>
          
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {threatCategories.map((category, index) => {
                  const startAngle = threatCategories.slice(0, index).reduce((sum, cat) => sum + (cat.percentage * 3.6), 0);
                  const endAngle = startAngle + (category.percentage * 3.6);
                  const largeArcFlag = category.percentage > 50 ? 1 : 0;
                  
                  const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                  const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                  const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
                  const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
                  
                  return (
                    <path
                      key={index}
                      d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                      className={`${getColorClass(category.color)} opacity-80 hover:opacity-100 transition-opacity cursor-pointer`}
                      stroke="rgba(15, 23, 42, 0.5)"
                      strokeWidth="0.5"
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">1,247</div>
                  <div className="text-sm text-slate-400">Total Threats</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            {threatCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 ${getColorClass(category.color)} rounded mr-3`}></div>
                  <span className="text-white text-sm">{category.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">{category.count}</div>
                  <div className="text-slate-400 text-xs">{category.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-green-400" />
          Performance Metrics
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="text-white font-medium">Detection Accuracy</h3>
            <div className="space-y-3">
              {[
                { name: 'True Positives', value: 94.2, color: 'green' },
                { name: 'False Positives', value: 2.3, color: 'red' },
                { name: 'False Negatives', value: 1.8, color: 'orange' },
                { name: 'True Negatives', value: 1.7, color: 'blue' }
              ].map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-sm">{metric.name}</span>
                    <span className="text-white text-sm">{metric.value}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getColorClass(metric.color)} transition-all duration-1000`}
                      style={{ width: `${metric.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-white font-medium">Response Times</h3>
            <div className="space-y-3">
              {[
                { name: 'Detection Time', value: '2.3s', target: '< 5s', status: 'good' },
                { name: 'Alert Time', value: '8.5m', target: '< 10m', status: 'good' },
                { name: 'Response Time', value: '15.2m', target: '< 20m', status: 'good' },
                { name: 'Resolution Time', value: '2.4h', target: '< 4h', status: 'good' }
              ].map((metric, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                  <div>
                    <div className="text-white text-sm">{metric.name}</div>
                    <div className="text-slate-400 text-xs">Target: {metric.target}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-medium">{metric.value}</div>
                    <div className="text-green-400 text-xs">✓ On Target</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-white font-medium">System Health</h3>
            <div className="space-y-3">
              {[
                { name: 'Uptime', value: 99.9, unit: '%', color: 'green' },
                { name: 'CPU Usage', value: 34, unit: '%', color: 'blue' },
                { name: 'Memory Usage', value: 67, unit: '%', color: 'yellow' },
                { name: 'Disk Usage', value: 45, unit: '%', color: 'purple' }
              ].map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-sm">{metric.name}</span>
                    <span className="text-white text-sm">{metric.value}{metric.unit}</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getColorClass(metric.color)} transition-all duration-1000`}
                      style={{ width: `${metric.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;