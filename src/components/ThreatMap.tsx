import React, { useState, useEffect } from 'react';
import { Globe, MapPin, AlertTriangle, Shield } from 'lucide-react';

const ThreatMap: React.FC = () => {
  const [threats, setThreats] = useState<any[]>([]);
  const [selectedThreat, setSelectedThreat] = useState<any>(null);

  useEffect(() => {
    // Simulate real-time threat data
    const generateThreats = () => {
      const threatTypes = ['Malware', 'Phishing', 'DDoS', 'Brute Force', 'Data Breach'];
      const countries = ['USA', 'China', 'Russia', 'Brazil', 'Germany', 'India', 'UK', 'France'];
      const severities = ['Low', 'Medium', 'High', 'Critical'];
      
      return Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        type: threatTypes[Math.floor(Math.random() * threatTypes.length)],
        country: countries[Math.floor(Math.random() * countries.length)],
        severity: severities[Math.floor(Math.random() * severities.length)],
        ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        timestamp: new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString()
      }));
    };

    setThreats(generateThreats());
    
    const interval = setInterval(() => {
      setThreats(generateThreats());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-500 border-red-400';
      case 'High': return 'bg-orange-500 border-orange-400';
      case 'Medium': return 'bg-yellow-500 border-yellow-400';
      default: return 'bg-blue-500 border-blue-400';
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center">
          <Globe className="w-5 h-5 mr-2 text-blue-400" />
          Global Threat Map
        </h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400">Live Feed</span>
          </div>
          <span className="text-slate-400 text-sm">{threats.length} active threats</span>
        </div>
      </div>

      {/* 3D World Map Container */}
      <div className="relative h-96 bg-gradient-to-br from-slate-900/50 to-blue-900/20 rounded-lg border border-slate-600/30 overflow-hidden">
        {/* World Map Background */}
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 1000 500" className="w-full h-full">
            {/* Simplified world map paths */}
            <path
              d="M150,200 L200,180 L250,190 L300,200 L350,210 L400,200 L450,190 L500,200 L550,210 L600,200 L650,190 L700,200 L750,210 L800,200 L850,190"
              stroke="rgba(59, 130, 246, 0.3)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M100,250 L150,240 L200,250 L250,260 L300,250 L350,240 L400,250 L450,260 L500,250 L550,240 L600,250 L650,260 L700,250 L750,240 L800,250"
              stroke="rgba(59, 130, 246, 0.3)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M200,300 L250,290 L300,300 L350,310 L400,300 L450,290 L500,300 L550,310 L600,300 L650,290 L700,300 L750,310"
              stroke="rgba(59, 130, 246, 0.3)"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>

        {/* Grid Lines */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>

        {/* Threat Indicators */}
        {threats.map((threat) => (
          <div
            key={threat.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{ left: `${threat.x}%`, top: `${threat.y}%` }}
            onClick={() => setSelectedThreat(threat)}
          >
            <div className={`w-4 h-4 rounded-full ${getSeverityColor(threat.severity)} animate-pulse border-2 shadow-lg`}>
              <div className="absolute inset-0 rounded-full animate-ping opacity-75"></div>
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-900/95 backdrop-blur-sm border border-slate-600/50 rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 min-w-48">
              <div className="text-white font-medium text-sm">{threat.type}</div>
              <div className="text-slate-400 text-xs">{threat.country} • {threat.ip}</div>
              <div className="text-slate-400 text-xs">{threat.timestamp}</div>
              <div className={`text-xs font-medium mt-1 ${
                threat.severity === 'Critical' ? 'text-red-400' :
                threat.severity === 'High' ? 'text-orange-400' :
                threat.severity === 'Medium' ? 'text-yellow-400' :
                'text-blue-400'
              }`}>
                {threat.severity} Severity
              </div>
            </div>
          </div>
        ))}

        {/* Animated Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {threats.slice(0, 5).map((threat, index) => (
            <line
              key={`line-${threat.id}`}
              x1="50%"
              y1="50%"
              x2={`${threat.x}%`}
              y2={`${threat.y}%`}
              stroke="rgba(59, 130, 246, 0.3)"
              strokeWidth="1"
              strokeDasharray="5,5"
              className="animate-pulse"
              style={{ animationDelay: `${index * 0.5}s` }}
            />
          ))}
        </svg>

        {/* Central Hub */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center border-2 border-green-400 shadow-lg shadow-green-500/50">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div className="absolute inset-0 w-8 h-8 border-2 border-green-400/30 rounded-full animate-ping"></div>
        </div>
      </div>

      {/* Threat Details Panel */}
      {selectedThreat && (
        <div className="mt-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-medium">Threat Details</h3>
            <button
              onClick={() => setSelectedThreat(null)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              ×
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-400">Type:</span>
              <span className="text-white ml-2">{selectedThreat.type}</span>
            </div>
            <div>
              <span className="text-slate-400">Severity:</span>
              <span className={`ml-2 font-medium ${
                selectedThreat.severity === 'Critical' ? 'text-red-400' :
                selectedThreat.severity === 'High' ? 'text-orange-400' :
                selectedThreat.severity === 'Medium' ? 'text-yellow-400' :
                'text-blue-400'
              }`}>
                {selectedThreat.severity}
              </span>
            </div>
            <div>
              <span className="text-slate-400">Source:</span>
              <span className="text-white ml-2">{selectedThreat.country}</span>
            </div>
            <div>
              <span className="text-slate-400">IP Address:</span>
              <span className="text-white ml-2 font-mono">{selectedThreat.ip}</span>
            </div>
            <div>
              <span className="text-slate-400">Detected:</span>
              <span className="text-white ml-2">{selectedThreat.timestamp}</span>
            </div>
            <div>
              <span className="text-slate-400">Status:</span>
              <span className="text-green-400 ml-2">Monitoring</span>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full border border-blue-400"></div>
          <span className="text-slate-400">Low</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full border border-yellow-400"></div>
          <span className="text-slate-400">Medium</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full border border-orange-400"></div>
          <span className="text-slate-400">High</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full border border-red-400"></div>
          <span className="text-slate-400">Critical</span>
        </div>
      </div>
    </div>
  );
};

export default ThreatMap;