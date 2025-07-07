import React, { useState } from 'react';
import { Mail, AlertTriangle, CheckCircle, Shield, Zap, FileText, Link, User, Info } from 'lucide-react';
import { PhishingAnalyzer } from '../utils/phishingAnalyzer';

const EmailAnalysis: React.FC = () => {
  const [emailContent, setEmailContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const analyzeEmail = async () => {
    if (!emailContent.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate processing time for realistic feel
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const result = PhishingAnalyzer.analyzeEmail(emailContent);
    setAnalysis(result);
    setIsAnalyzing(false);
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
          Email Analysis
        </h1>
        <p className="text-xl text-slate-400">
          Advanced AI-powered email threat detection with high accuracy
        </p>
      </div>

      {/* Email Input */}
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
        <div className="flex items-center mb-4">
          <Mail className="w-5 h-5 mr-2 text-blue-400" />
          <h2 className="text-xl font-bold text-white">Email Content Analysis</h2>
        </div>
        <div className="space-y-4">
          <textarea
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            placeholder="Paste your email content here (including headers, body, and any suspicious elements)...

Example:
From: security@paypal-verification.net
Subject: Urgent: Account Suspended - Immediate Action Required

Dear Customer,

Your PayPal account has been temporarily suspended due to unusual activity. Click here to verify your account immediately: http://paypal-secure.tk/verify

You have 24 hours to complete verification or your account will be permanently closed.

Best regards,
PayPal Security Team"
            className="w-full h-64 px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <div className="flex justify-between items-center">
            <p className="text-sm text-slate-400">
              {emailContent.length} characters • AI analyzes content, structure, and patterns
            </p>
            <button
              onClick={analyzeEmail}
              disabled={!emailContent.trim() || isAnalyzing}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:transform-none flex items-center"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Analyze Email
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          {/* Risk Score with Confidence */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center">
                <Shield className="w-5 h-5 mr-2 text-blue-400" />
                Risk Assessment
              </h2>
              <div className="flex items-center space-x-4">
                <div className={`px-4 py-2 rounded-full ${getRiskLevel(analysis.riskScore).bgColor} ${getRiskLevel(analysis.riskScore).borderColor} border`}>
                  <span className={`font-bold ${getRiskLevel(analysis.riskScore).color}`}>
                    {getRiskLevel(analysis.riskScore).level} Risk
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <Info className="w-4 h-4 mr-1 text-slate-400" />
                  <span className={`font-medium ${getConfidenceColor(analysis.confidence)}`}>
                    {analysis.confidence}% Confidence
                  </span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Risk Score</span>
                  <span className="text-2xl font-bold text-white">{analysis.riskScore}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-1000 ${
                      analysis.riskScore >= 70 ? 'bg-red-500' :
                      analysis.riskScore >= 40 ? 'bg-yellow-500' :
                      analysis.riskScore >= 20 ? 'bg-orange-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${analysis.riskScore}%` }}
                  ></div>
                </div>
                <div className="text-sm text-slate-400">
                  Analysis based on content patterns, structure, and known threat indicators
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Sender Reputation</span>
                  <span className="text-white">{Math.round(analysis.technicalDetails.senderReputation)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Domain Age</span>
                  <span className="text-white">{analysis.technicalDetails.domainAge} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Links Found</span>
                  <span className="text-white">{analysis.technicalDetails.linkCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">SPF Record</span>
                  <span className={analysis.technicalDetails.spfRecord ? 'text-green-400' : 'text-red-400'}>
                    {analysis.technicalDetails.spfRecord ? 'Valid' : 'Missing'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">DKIM Signature</span>
                  <span className={analysis.technicalDetails.dkimValid ? 'text-green-400' : 'text-red-400'}>
                    {analysis.technicalDetails.dkimValid ? 'Valid' : 'Invalid'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Threats Detected */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
              Threat Analysis
            </h2>
            <div className="space-y-3">
              {analysis.threats.length > 0 ? (
                analysis.threats.map((threat: string, index: number) => (
                  <div key={index} className="flex items-center p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-red-400 mr-3 flex-shrink-0" />
                    <span className="text-white">{threat}</span>
                  </div>
                ))
              ) : (
                <div className="flex items-center p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  <span className="text-white">No significant threats detected in email content</span>
                </div>
              )}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
              Security Recommendations
            </h2>
            <div className="space-y-3">
              {analysis.recommendations.map((rec: string, index: number) => (
                <div key={index} className="flex items-start p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-white">{rec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Details */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-purple-400" />
              Technical Analysis
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">Email Authentication</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-slate-700/30 rounded">
                    <span className="text-slate-400">SPF Record</span>
                    <span className={analysis.technicalDetails.spfRecord ? 'text-green-400' : 'text-red-400'}>
                      {analysis.technicalDetails.spfRecord ? '✓ Pass' : '✗ Fail'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-slate-700/30 rounded">
                    <span className="text-slate-400">DKIM Signature</span>
                    <span className={analysis.technicalDetails.dkimValid ? 'text-green-400' : 'text-red-400'}>
                      {analysis.technicalDetails.dkimValid ? '✓ Valid' : '✗ Invalid'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-slate-700/30 rounded">
                    <span className="text-slate-400">DMARC Policy</span>
                    <span className="text-white capitalize">{analysis.technicalDetails.dmarcPolicy}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">Content Analysis</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-slate-700/30 rounded">
                    <span className="text-slate-400">Links Detected</span>
                    <span className="text-white">{analysis.technicalDetails.linkCount}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-slate-700/30 rounded">
                    <span className="text-slate-400">Attachments</span>
                    <span className="text-white">{analysis.technicalDetails.attachmentCount}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-slate-700/30 rounded">
                    <span className="text-slate-400">Analysis Confidence</span>
                    <span className={getConfidenceColor(analysis.confidence)}>
                      {analysis.confidence}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analysis in Progress */}
      {isAnalyzing && (
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-500/30 rounded-full animate-spin"></div>
                <div className="absolute inset-2 w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white">Analyzing Email Content...</h3>
            <p className="text-slate-400">Advanced AI is processing patterns, structure, and threat indicators</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailAnalysis;