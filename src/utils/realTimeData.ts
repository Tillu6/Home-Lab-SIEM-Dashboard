export interface NetworkDevice {
  id: string;
  name: string;
  ip: string;
  type: 'Router' | 'Switch' | 'Firewall' | 'Server' | 'Workstation' | 'Access Point';
  status: 'online' | 'offline' | 'warning' | 'critical';
  cpu: number;
  memory: number;
  uptime: number;
  lastSeen: Date;
  location: string;
  vendor: string;
  model: string;
  ports: number;
  activePorts: number;
}

export interface SecurityEvent {
  id: string;
  timestamp: Date;
  type: 'malware' | 'intrusion' | 'phishing' | 'ddos' | 'bruteforce' | 'anomaly';
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  destination: string;
  description: string;
  status: 'new' | 'investigating' | 'resolved' | 'false_positive';
  assignee?: string;
  mitreTechniques: string[];
}

export interface ThreatIntelligence {
  id: string;
  ioc: string;
  type: 'ip' | 'domain' | 'hash' | 'url' | 'email';
  threatType: string;
  confidence: number;
  firstSeen: Date;
  lastSeen: Date;
  source: string;
  description: string;
  tags: string[];
}

export class RealTimeDataService {
  private static instance: RealTimeDataService;
  private devices: NetworkDevice[] = [];
  private events: SecurityEvent[] = [];
  private threats: ThreatIntelligence[] = [];
  private subscribers: Map<string, Function[]> = new Map();

  static getInstance(): RealTimeDataService {
    if (!RealTimeDataService.instance) {
      RealTimeDataService.instance = new RealTimeDataService();
    }
    return RealTimeDataService.instance;
  }

  constructor() {
    this.initializeData();
    this.startRealTimeUpdates();
  }

  private initializeData() {
    // Initialize network devices
    this.devices = [
      {
        id: 'dev-001',
        name: 'Core-Router-01',
        ip: '192.168.1.1',
        type: 'Router',
        status: 'online',
        cpu: 45,
        memory: 67,
        uptime: 2592000, // 30 days
        lastSeen: new Date(),
        location: 'Server Room A',
        vendor: 'Cisco',
        model: 'ISR4331',
        ports: 24,
        activePorts: 18
      },
      {
        id: 'dev-002',
        name: 'Core-Switch-01',
        ip: '192.168.1.2',
        type: 'Switch',
        status: 'online',
        cpu: 23,
        memory: 34,
        uptime: 1728000, // 20 days
        lastSeen: new Date(),
        location: 'Server Room A',
        vendor: 'Cisco',
        model: 'Catalyst 2960',
        ports: 48,
        activePorts: 32
      },
      {
        id: 'dev-003',
        name: 'Firewall-Edge-01',
        ip: '192.168.1.3',
        type: 'Firewall',
        status: 'warning',
        cpu: 78,
        memory: 89,
        uptime: 864000, // 10 days
        lastSeen: new Date(),
        location: 'DMZ',
        vendor: 'Fortinet',
        model: 'FortiGate 60F',
        ports: 8,
        activePorts: 6
      },
      {
        id: 'dev-004',
        name: 'Web-Server-01',
        ip: '192.168.1.10',
        type: 'Server',
        status: 'online',
        cpu: 56,
        memory: 72,
        uptime: 5184000, // 60 days
        lastSeen: new Date(),
        location: 'Server Room B',
        vendor: 'Dell',
        model: 'PowerEdge R740',
        ports: 4,
        activePorts: 2
      },
      {
        id: 'dev-005',
        name: 'DB-Server-01',
        ip: '192.168.1.11',
        type: 'Server',
        status: 'critical',
        cpu: 92,
        memory: 95,
        uptime: 432000, // 5 days
        lastSeen: new Date(),
        location: 'Server Room B',
        vendor: 'HP',
        model: 'ProLiant DL380',
        ports: 4,
        activePorts: 3
      }
    ];

    // Initialize security events
    this.events = [
      {
        id: 'evt-001',
        timestamp: new Date(Date.now() - 300000), // 5 minutes ago
        type: 'malware',
        severity: 'high',
        source: '192.168.1.45',
        destination: '203.45.67.89',
        description: 'Trojan.Win32.Agent detected on workstation WS-045',
        status: 'investigating',
        assignee: 'John Smith',
        mitreTechniques: ['T1055', 'T1082']
      },
      {
        id: 'evt-002',
        timestamp: new Date(Date.now() - 600000), // 10 minutes ago
        type: 'bruteforce',
        severity: 'critical',
        source: '203.45.67.89',
        destination: '192.168.1.3',
        description: 'Multiple failed SSH login attempts detected',
        status: 'resolved',
        assignee: 'Sarah Johnson',
        mitreTechniques: ['T1110.001']
      },
      {
        id: 'evt-003',
        timestamp: new Date(Date.now() - 900000), // 15 minutes ago
        type: 'phishing',
        severity: 'medium',
        source: 'email-gateway',
        destination: 'user@company.com',
        description: 'Phishing email blocked by email security gateway',
        status: 'resolved',
        assignee: 'Mike Wilson',
        mitreTechniques: ['T1566.002']
      }
    ];

    // Initialize threat intelligence
    this.threats = [
      {
        id: 'thr-001',
        ioc: '203.45.67.89',
        type: 'ip',
        threatType: 'Botnet C&C',
        confidence: 95,
        firstSeen: new Date(Date.now() - 86400000), // 1 day ago
        lastSeen: new Date(Date.now() - 300000), // 5 minutes ago
        source: 'ThreatFeed-Alpha',
        description: 'Known botnet command and control server',
        tags: ['botnet', 'c2', 'malware']
      },
      {
        id: 'thr-002',
        ioc: 'malicious-domain.tk',
        type: 'domain',
        threatType: 'Phishing',
        confidence: 88,
        firstSeen: new Date(Date.now() - 172800000), // 2 days ago
        lastSeen: new Date(Date.now() - 3600000), // 1 hour ago
        source: 'PhishTank',
        description: 'Domain used in banking phishing campaign',
        tags: ['phishing', 'banking', 'fraud']
      }
    ];
  }

  private startRealTimeUpdates() {
    // Update device metrics every 5 seconds
    setInterval(() => {
      this.devices.forEach(device => {
        // Simulate realistic metric changes
        device.cpu = Math.max(0, Math.min(100, device.cpu + (Math.random() - 0.5) * 10));
        device.memory = Math.max(0, Math.min(100, device.memory + (Math.random() - 0.5) * 5));
        device.lastSeen = new Date();
        
        // Occasionally change status based on metrics
        if (device.cpu > 90 || device.memory > 95) {
          device.status = 'critical';
        } else if (device.cpu > 75 || device.memory > 85) {
          device.status = 'warning';
        } else {
          device.status = 'online';
        }
      });
      
      this.notifySubscribers('devices', this.devices);
    }, 5000);

    // Generate new security events occasionally
    setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 30 seconds
        const newEvent = this.generateRandomEvent();
        this.events.unshift(newEvent);
        this.events = this.events.slice(0, 100); // Keep only last 100 events
        this.notifySubscribers('events', this.events);
      }
    }, 30000);
  }

  private generateRandomEvent(): SecurityEvent {
    const types: SecurityEvent['type'][] = ['malware', 'intrusion', 'phishing', 'ddos', 'bruteforce', 'anomaly'];
    const severities: SecurityEvent['severity'][] = ['low', 'medium', 'high', 'critical'];
    const sources = ['192.168.1.45', '192.168.1.67', '203.45.67.89', '10.0.0.15', 'email-gateway'];
    const destinations = ['192.168.1.10', '192.168.1.11', '192.168.1.3', 'external'];

    const type = types[Math.floor(Math.random() * types.length)];
    const severity = severities[Math.floor(Math.random() * severities.length)];

    const descriptions = {
      malware: ['Suspicious executable detected', 'Malware signature match', 'Behavioral analysis alert'],
      intrusion: ['Unauthorized access attempt', 'Privilege escalation detected', 'Lateral movement observed'],
      phishing: ['Phishing email detected', 'Suspicious link clicked', 'Credential harvesting attempt'],
      ddos: ['DDoS attack detected', 'Traffic anomaly observed', 'Service degradation alert'],
      bruteforce: ['Multiple login failures', 'Password spray attack', 'Account lockout triggered'],
      anomaly: ['Unusual network traffic', 'Abnormal user behavior', 'Data exfiltration pattern']
    };

    return {
      id: `evt-${Date.now()}`,
      timestamp: new Date(),
      type,
      severity,
      source: sources[Math.floor(Math.random() * sources.length)],
      destination: destinations[Math.floor(Math.random() * destinations.length)],
      description: descriptions[type][Math.floor(Math.random() * descriptions[type].length)],
      status: 'new',
      mitreTechniques: [`T${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`]
    };
  }

  subscribe(channel: string, callback: Function) {
    if (!this.subscribers.has(channel)) {
      this.subscribers.set(channel, []);
    }
    this.subscribers.get(channel)!.push(callback);
  }

  unsubscribe(channel: string, callback: Function) {
    const callbacks = this.subscribers.get(channel);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  private notifySubscribers(channel: string, data: any) {
    const callbacks = this.subscribers.get(channel);
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }

  // Public API methods
  getDevices(): NetworkDevice[] {
    return [...this.devices];
  }

  getEvents(): SecurityEvent[] {
    return [...this.events];
  }

  getThreats(): ThreatIntelligence[] {
    return [...this.threats];
  }

  updateEventStatus(eventId: string, status: SecurityEvent['status'], assignee?: string) {
    const event = this.events.find(e => e.id === eventId);
    if (event) {
      event.status = status;
      if (assignee) event.assignee = assignee;
      this.notifySubscribers('events', this.events);
    }
  }

  addThreatIOC(ioc: ThreatIntelligence) {
    this.threats.unshift(ioc);
    this.notifySubscribers('threats', this.threats);
  }

  blockIP(ip: string) {
    // Simulate blocking an IP
    console.log(`Blocking IP: ${ip}`);
    // In real implementation, this would interface with firewall APIs
  }

  quarantineDevice(deviceId: string) {
    const device = this.devices.find(d => d.id === deviceId);
    if (device) {
      device.status = 'offline';
      console.log(`Quarantining device: ${device.name}`);
      this.notifySubscribers('devices', this.devices);
    }
  }
}