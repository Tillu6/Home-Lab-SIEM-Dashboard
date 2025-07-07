import React from 'react';
import { TrendingUp, Shield, Eye, Zap } from 'lucide-react';

const SecurityMetrics: React.FC = () => {
  const metrics = [
    {
      title: 'Detection Rate',
      value: 99.2,
      trend: '+2.1%',
      icon: Eye,
      color: 'green'
    },
    {
      title: 'Response Time',
      value: 1.3,
      unit: 's',
      trend: '-0.4s',
      icon: Zap,
      color: 'blue'
    },
    {
      title: 'False Positives',
      value: 0.8,
      unit: '%',
      trend: '-0.2%',
      icon: Shield,
      color: 'purple'
    }
  ];

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center">
        <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
        Security Metrics
      </h2>
      <div className="space-y-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Icon className={`w-4 h-4 mr-2 ${
                    metric.color === 'green' ? 'text-green-400' :
                    metric.color === 'blue' ? 'text-blue-400' :
                    'text-purple-400'
                  }`} />
                  <span className="text-white font-medium">{metric.title}</span>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold">
                    {metric.value}{metric.unit || '%'}
                  </div>
                  <div className={`text-xs ${
                    metric.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {metric.trend}
                  </div>
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    metric.color === 'green' ? 'bg-green-500' :
                    metric.color === 'blue' ? 'bg-blue-500' :
                    'bg-purple-500'
                  }`}
                  style={{ width: `${metric.value > 10 ? metric.value : metric.value * 10}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SecurityMetrics;