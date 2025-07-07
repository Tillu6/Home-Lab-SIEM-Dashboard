import { useState, useEffect } from 'react';
import { RealTimeDataService, NetworkDevice, SecurityEvent, ThreatIntelligence } from '../utils/realTimeData';

export function useRealTimeData() {
  const [devices, setDevices] = useState<NetworkDevice[]>([]);
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [threats, setThreats] = useState<ThreatIntelligence[]>([]);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const dataService = RealTimeDataService.getInstance();
    
    // Initial data load
    setDevices(dataService.getDevices());
    setEvents(dataService.getEvents());
    setThreats(dataService.getThreats());

    // Subscribe to real-time updates
    const handleDeviceUpdate = (updatedDevices: NetworkDevice[]) => {
      setDevices(updatedDevices);
    };

    const handleEventUpdate = (updatedEvents: SecurityEvent[]) => {
      setEvents(updatedEvents);
    };

    const handleThreatUpdate = (updatedThreats: ThreatIntelligence[]) => {
      setThreats(updatedThreats);
    };

    dataService.subscribe('devices', handleDeviceUpdate);
    dataService.subscribe('events', handleEventUpdate);
    dataService.subscribe('threats', handleThreatUpdate);

    // Simulate connection status
    const connectionCheck = setInterval(() => {
      setIsConnected(Math.random() > 0.05); // 95% uptime
    }, 10000);

    return () => {
      dataService.unsubscribe('devices', handleDeviceUpdate);
      dataService.unsubscribe('events', handleEventUpdate);
      dataService.unsubscribe('threats', handleThreatUpdate);
      clearInterval(connectionCheck);
    };
  }, []);

  return {
    devices,
    events,
    threats,
    isConnected,
    dataService: RealTimeDataService.getInstance()
  };
}