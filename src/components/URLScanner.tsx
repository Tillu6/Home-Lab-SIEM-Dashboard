import React, { useState } from 'react';
import { Globe, AlertTriangle, CheckCircle, Shield, Link, ExternalLink, Clock, Info } from 'lucide-react';
import { PhishingAnalyzer } from '../utils/phishingAnalyzer';

const URLScanner: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);

  const scanURL = async () => {
    if (!url.trim()) return;

    setIsScanning(true);
    
    // Simulate realistic scanning time
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const result = PhishingAnalyzer.analyzeURL(url);
    setScanResult(result);
    setIsScanning(false);
  };

  const getRiskLevel = (score: number) => {
    if (score >= 70) return { level: 'High', color: 'text-red-400', bgColor: 'bg-red-500/10', borderColor: 'border-red-500/30' };
    if (score >= 40) return { level: 'Medium', color: 'text-yellow-400', bgColor: 'bg-yellow-500/10', borderColor: 'border-yellow-500/30' };
    if (score >= 20) return { level: 'Low', color: 'text-orange-400', bgColor: 'bg-orange-500/10', borderColor: 'border-orange-500/30' };
    return { level: 'Safe', color: 'text-green-400', bgColor: 'bg-green-500/10', borderColor: 'border-green-500/30' };
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-400';
    if (confidence >= 75) return 'text-blue-400';
    if (confidence >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          URL Scanner
        </h1>
        <p className="text-xl text-slate-400">
          Comprehensive URL analysis with real-world accuracy
        </p>
      </div>

      {/* URL Input */}
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
        <div className="flex items-center mb-4">
          <Globe className="w-5 h-5 mr-2 text-blue-400" />
          <h2 className="text-xl font-bold text-white">URL Security Analysis</h2>
        </div>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL to scan (e.g., https://example.com, http://paypal-secure.tk/verify)"
              className="flex-1 px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={scanURL}
              disabled={!url.trim() || isScanning}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:transform-none flex items-center"
            >
              {isScanning ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Scanning...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  Scan URL
                </>
              )}
            </button>
          </div>
          <div className="text-sm text-slate-400">
            Advanced analysis checks domain reputation, security features, and threat indicators
          </div>
        </div>
      </div>

      {/* Scan Results */}
      {scanResult && (
        <div className="space-y-6">
          {/* URL Info */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white flex items-center">
                <Link className="w-5 h-5 mr-2 text-blue-400" />
                URL Analysis Results
              </h2>
              <div className="flex items-center space-x-4">
                <div className={`px-4 py-2 rounded-full ${getRiskLevel(scanResult.riskScore).bgColor} ${getRiskLevel(scanResult.riskScore).borderColor} border`}>
                  <span className={`font-bold ${getRiskLevel(scanResult.riskScore).color}`}>
                    {getRiskLevel(scanResult.riskScore).level} Risk
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <Info className="w-4 h-4 mr-1 text-slate-400" />
                  <span className={`font-medium ${getConfidenceColor(scanResult.confidence)}`}>
                    {scanResult.confidence}% Confidence
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-slate-700/30 rounded-lg">
                <ExternalLink className="w-4 h-4 text-blue-400 mr-3 flex-shrink-0" />
                <span className="text-white break-all">{scanResult.url}</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                  <div className="text-2xl font-bold text-white">{scanResult.riskScore}%</div>
                  <div className="text-sm text-slate-400">Risk Score</div>
                </div>
                <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                  <div className="text-2xl font-bold text-white">{scanResult.reputation}%</div>
                  <div className="text-sm text-slate-400">Reputation</div>
                </div>
                <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                  <div className="text-lg font-bold text-white">{scanResult.category}</div>
                  <div className="text-sm text-slate-400">Category</div>
                </div>
                <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                  <div className="text-lg font-bold text-white">{scanResult.scanEngines.detected}/{scanResult.scanEngines.total}</div>
                  <div className="text-sm text-slate-400">Detections</div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Features */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-green-400" />
              Security Features Analysis
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">Connection Security</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-slate-400">HTTPS Enabled</span>
                    <div className="flex items-center">
                      {scanResult.securityFeatures.httpsEnabled ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                      )}
                      <span className={`ml-2 ${scanResult.securityFeatures.httpsEnabled ? 'text-green-400' : 'text-red-400'}`}>
                        {scanResult.securityFeatures.httpsEnabled ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-slate-400">Valid Certificate</span>
                    <div className="flex items-center">
                      {scanResult.securityFeatures.validCertificate ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                      )}
                      <span className={`ml-2 ${scanResult.securityFeatures.validCertificate ? 'text-green-400' : 'text-red-400'}`}>
                        {scanResult.securityFeatures.validCertificate ? 'Valid' : 'Invalid'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">Domain Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-slate-400">Domain Age</span>
                    <span className="text-white">{scanResult.securityFeatures.domainAge} days</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-slate-400">Redirects</span>
                    <span className="text-white">{scanResult.securityFeatures.redirectCount}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <span className="text-slate-400">Privacy Policy</span>
                <span className={scanResult.securityFeatures.hasPrivacyPolicy ? 'text-green-400' : 'text-red-400'}>
                  {scanResult.securityFeatures.hasPrivacyPolicy ? 'Present' : 'Missing'}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <span className="text-slate-400">Terms of Service</span>
                <span className={scanResult.securityFeatures.hasTermsOfService ? 'text-green-400' : 'text-red-400'}>
                  {scanResult.securityFeatures.hasTermsOfService ? 'Present' : 'Missing'}
                </span>
              </div>
            </div>
          </div>

          {/* Threats */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
              Threat Analysis
            </h2>
            <div className="space-y-3">
              {scanResult.threats.length > 0 ? (
                scanResult.threats.map((threat: string, index: number) => (
                  <div key={index} className="flex items-center p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-red-400 mr-3 flex-shrink-0" />
                    <span className="text-white">{threat}</span>
                  </div>
                ))
              ) : (
                <div className="flex items-center p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  <span className="text-white">No significant threats detected</span>
                </div>
              )}
            </div>
          </div>

          {/* Scan Details */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-400" />
              Scan Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                <div className="text-2xl font-bold text-white mb-1">
                  {scanResult.scanEngines.detected}
                </div>
                <div className="text-sm text-slate-400">Security Engines</div>
                <div className="text-xs text-slate-500">Flagged as suspicious</div>
              </div>
              <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                <div className="text-2xl font-bold text-white mb-1">
                  {scanResult.confidence}%
                </div>
                <div className="text-sm text-slate-400">Confidence Level</div>
                <div className="text-xs text-slate-500">Analysis accuracy</div>
              </div>
              <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                <div className="text-lg font-bold text-white mb-1">
                  {new Date().toLocaleTimeString()}
                </div>
                <div className="text-sm text-slate-400">Scan Time</div>
                <div className="text-xs text-slate-500">Last analyzed</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scanning in Progress */}
      {isScanning && (
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-500/30 rounded-full animate-spin"></div>
                <div className="absolute inset-2 w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white">Scanning URL...</h3>
            <p className="text-slate-400">Analyzing domain reputation, security features, and threat indicators</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default URLScanner;