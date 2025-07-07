import React, { useState } from 'react';
import { FileText, AlertTriangle, Clock, User, CheckCircle, Play, Pause, RotateCcw, Plus, Search, Filter } from 'lucide-react';
import { useRealTimeData } from '../hooks/useRealTimeData';

const IncidentResponse: React.FC = () => {
  const { events, dataService } = useRealTimeData();
  const [selectedIncident, setSelectedIncident] = useState<any>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('all');

  // Convert events to incidents format
  const incidents = events.map(event => ({
    id: event.id,
    title: `${event.type.charAt(0).toUpperCase() + event.type.slice(1)} Detection`,
    severity: event.severity.charAt(0).toUpperCase() + event.severity.slice(1),
    status: event.status === 'new' ? 'Open' : 
            event.status === 'investigating' ? 'In Progress' : 
            event.status === 'resolved' ? 'Resolved' : 'Closed',
    assignee: event.assignee || 'Unassigned',
    created: event.timestamp.toISOString(),
    updated: event.timestamp.toISOString(),
    description: event.description,
    category: event.type.charAt(0).toUpperCase() + event.type.slice(1),
    priority: event.severity === 'critical' ? 'P1' : 
              event.severity === 'high' ? 'P2' : 
              event.severity === 'medium' ? 'P3' : 'P4',
    source: event.source,
    destination: event.destination,
    mitreTechniques: event.mitreTechniques,
    timeline: [
      { 
        time: event.timestamp.toLocaleTimeString(), 
        action: 'Incident created', 
        user: 'System', 
        status: 'info' 
      },
      ...(event.assignee ? [{
        time: new Date(event.timestamp.getTime() + 300000).toLocaleTimeString(),
        action: `Assigned to ${event.assignee}`,
        user: 'SOC Manager',
        status: 'info'
      }] : []),
      ...(event.status === 'investigating' ? [{
        time: new Date(event.timestamp.getTime() + 600000).toLocaleTimeString(),
        action: 'Investigation started',
        user: event.assignee || 'Analyst',
        status: 'warning'
      }] : []),
      ...(event.status === 'resolved' ? [{
        time: new Date(event.timestamp.getTime() + 1800000).toLocaleTimeString(),
        action: 'Incident resolved',
        user: event.assignee || 'Analyst',
        status: 'success'
      }] : [])
    ]
  }));

  // Filter incidents
  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = filterSeverity === 'all' || incident.severity.toLowerCase() === filterSeverity;
    return matchesSearch && matchesSeverity;
  });

  // Calculate statistics
  const criticalCount = incidents.filter(i => i.severity === 'Critical').length;
  const inProgressCount = incidents.filter(i => i.status === 'In Progress').length;
  const resolvedTodayCount = incidents.filter(i => 
    i.status === 'Resolved' && 
    new Date(i.updated).toDateString() === new Date().toDateString()
  ).length;

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
      case 'Open': return 'text-blue-400 bg-blue-500/10';
      case 'In Progress': return 'text-yellow-400 bg-yellow-500/10';
      case 'Resolved': return 'text-green-400 bg-green-500/10';
      case 'Closed': return 'text-slate-400 bg-slate-500/10';
      default: return 'text-slate-400 bg-slate-500/10';
    }
  };

  const getTimelineStatusColor = (status: string) => {
    switch (status) {
      case 'error': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      case 'success': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };

  const handleStatusUpdate = (incidentId: string, newStatus: string) => {
    const statusMap: { [key: string]: any } = {
      'Open': 'new',
      'In Progress': 'investigating',
      'Resolved': 'resolved',
      'Closed': 'resolved'
    };
    
    dataService.updateEventStatus(incidentId, statusMap[newStatus]);
    setSelectedIncident(null);
  };

  const handleCreateIncident = (incidentData: any) => {
    // In a real implementation, this would create a new incident
    console.log('Creating incident:', incidentData);
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Incident Response Center
          </h1>
          <p className="text-xl text-slate-400">
            Comprehensive incident management and response coordination
          </p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Incident
        </button>
      </div>

      {/* Incident Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-red-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-400 text-sm font-medium">Critical</p>
              <p className="text-2xl font-bold text-white">{criticalCount}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-yellow-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-400 text-sm font-medium">In Progress</p>
              <p className="text-2xl font-bold text-white">{inProgressCount}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-green-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm font-medium">Resolved Today</p>
              <p className="text-2xl font-bold text-white">{resolvedTodayCount}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-blue-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-sm font-medium">Avg Response Time</p>
              <p className="text-2xl font-bold text-white">8m</p>
            </div>
            <Clock className="w-8 h-8 text-blue-400" />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search incidents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Incident Management */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Incident List */}
        <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50">
          <div className="p-6 border-b border-slate-700/50">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Active Incidents ({filteredIncidents.length})</h2>
            </div>
          </div>
          <div className="divide-y divide-slate-700/30 max-h-96 overflow-y-auto">
            {filteredIncidents.map((incident) => (
              <div
                key={incident.id}
                onClick={() => setSelectedIncident(incident)}
                className="p-6 hover:bg-slate-700/20 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-blue-400 font-mono text-sm">{incident.id}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(incident.severity)}`}>
                        {incident.severity}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                        {incident.status}
                      </span>
                    </div>
                    <h3 className="text-white font-medium mb-2">{incident.title}</h3>
                    <p className="text-slate-400 text-sm mb-3">{incident.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-slate-500">
                      <div className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        {incident.assignee}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {new Date(incident.created).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusUpdate(incident.id, 'In Progress');
                      }}
                      className="p-2 text-green-400 hover:text-green-300 transition-colors"
                    >
                      <Play className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusUpdate(incident.id, 'Resolved');
                      }}
                      className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Incident Details */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50">
          <div className="p-6 border-b border-slate-700/50">
            <h2 className="text-xl font-bold text-white">Incident Details</h2>
          </div>
          {selectedIncident ? (
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-white font-medium mb-2">{selectedIncident.title}</h3>
                <p className="text-slate-400 text-sm">{selectedIncident.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-400">ID:</span>
                  <span className="text-white ml-2 font-mono">{selectedIncident.id}</span>
                </div>
                <div>
                  <span className="text-slate-400">Priority:</span>
                  <span className="text-white ml-2">{selectedIncident.priority}</span>
                </div>
                <div>
                  <span className="text-slate-400">Category:</span>
                  <span className="text-white ml-2">{selectedIncident.category}</span>
                </div>
                <div>
                  <span className="text-slate-400">Assignee:</span>
                  <span className="text-white ml-2">{selectedIncident.assignee}</span>
                </div>
                <div>
                  <span className="text-slate-400">Source:</span>
                  <span className="text-white ml-2 font-mono">{selectedIncident.source}</span>
                </div>
                <div>
                  <span className="text-slate-400">Destination:</span>
                  <span className="text-white ml-2 font-mono">{selectedIncident.destination}</span>
                </div>
              </div>

              <div>
                <h4 className="text-white font-medium mb-3">MITRE ATT&CK Techniques</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedIncident.mitreTechniques.map((technique: string, index: number) => (
                    <span key={index} className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">
                      {technique}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-white font-medium mb-3">Timeline</h4>
                <div className="space-y-3">
                  {selectedIncident.timeline.map((event: any, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getTimelineStatusColor(event.status)} mt-1 flex-shrink-0`}></div>
                      <div className="flex-1">
                        <div className="text-white text-sm">{event.action}</div>
                        <div className="text-slate-400 text-xs">{event.user} • {event.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => handleStatusUpdate(selectedIncident.id, 'In Progress')}
                  className="w-full px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition-colors"
                >
                  Start Investigation
                </button>
                <button 
                  onClick={() => handleStatusUpdate(selectedIncident.id, 'Resolved')}
                  className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                >
                  Mark Resolved
                </button>
                <button className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
                  Generate Report
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center">
              <FileText className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-400">Select an incident to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Response Playbooks */}
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
        <h2 className="text-xl font-bold text-white mb-6">Response Playbooks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Malware Response', steps: 8, time: '15-30 min', color: 'red', description: 'Isolate, analyze, and remediate malware infections' },
            { name: 'Data Breach', steps: 12, time: '1-2 hours', color: 'orange', description: 'Contain breach, assess impact, notify stakeholders' },
            { name: 'Network Intrusion', steps: 10, time: '30-60 min', color: 'yellow', description: 'Detect, contain, and eliminate unauthorized access' },
            { name: 'Phishing Attack', steps: 6, time: '10-20 min', color: 'blue', description: 'Block emails, educate users, investigate scope' },
            { name: 'DDoS Mitigation', steps: 5, time: '5-15 min', color: 'purple', description: 'Activate defenses, reroute traffic, monitor' },
            { name: 'Insider Threat', steps: 15, time: '2-4 hours', color: 'green', description: 'Investigate, preserve evidence, coordinate response' }
          ].map((playbook, index) => (
            <div key={index} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:border-slate-600/50 transition-colors cursor-pointer">
              <h3 className="text-white font-medium mb-2">{playbook.name}</h3>
              <p className="text-slate-400 text-sm mb-3">{playbook.description}</p>
              <div className="text-slate-400 text-sm space-y-1">
                <div>{playbook.steps} steps</div>
                <div>Est. time: {playbook.time}</div>
              </div>
              <button className="mt-3 text-blue-400 hover:text-blue-300 text-sm font-medium">
                View Playbook →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Create Incident Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Create New Incident</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Title</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white"
                  placeholder="Incident title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Severity</label>
                <select className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Description</label>
                <textarea 
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white h-24"
                  placeholder="Incident description"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleCreateIncident({})}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentResponse;