import { Injectable } from '@angular/core';

const getRandomStatus = () => {
  const statuses = ['warning', 'danger', 'success', 'info'];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

export interface Monitoring {
  id: string;
  tec: string;
  tracker: string;
  trip: string;
  plate: string;
  ignition: boolean;
  alert: string;
  progress: string;
  speed: string;
  client: string;
  date: string;
  position: string;
  origin: string;
  destination: string;
  alerts: string;
  vehicleStatus: string;
  observation: string;
  driver: string;
  wagon: string;
  communication: string;
  macro: boolean;
  embeddedIntelligence: boolean;
  bait: boolean;
  temperature: string;
  status: string;
}

export interface MonitoringMapData {
  directions: {
    destination: {
      lat: number;
      lng: number;
    }
    origin: {
      lat: number;
      lng: number;
    }
  };
  travelDuration: string;
  predictedArrival: string;
  predictedDeparture: string;
  leadTime: string;
  calculatedArrival: string;
  lastUpdatedAt: string;
  timeToArrival: string;
  distanceToArrival: string;
  route: {
    id: string;
    departure: string;
    arrival: string;
    timeToArrive: string;
    distanceToArrive: string;
    timeIdle: string;
  };
  nextTravel: {
    predictedArrival: string;
    predictedDeparture: string;
    leadTime: string;
    calculatedArrival: string;
    lastUpdatedAt: string;
    timeToArrival: string;
    distanceToArrival: string;
  };
}

const monitoringItem = (status) => ({
  id: '7f4d137d-0950-4d22-bb43-511e076ab35f',
  tec: 'https://e3ba6e8732e83984.cdn.gocache.net/uploads/image/file/229946/regular_1014221-848897488503062-7799701605911770867-n.jpg',
  tracker: '32049238',
  trip: '213941823',
  plate: 'ABC1234',
  ignition: true,
  alert: 'warning',
  progress: '50',
  speed: '90 km/h',
  client: 'Gertran SP',
  date: '01/01/2021 12:00:00',
  position: 'Avenida das nações unidas - São Paulo - SP',
  origin: 'Avenida das nações unidas - São Paulo - SP',
  destination: 'Avenida das nações unidas - São Paulo - SP',
  alerts: 'Porta motorista',
  vehicleStatus: '18 - VEÍCULO EM CONTINGÊNCIA 20-09-2022 16:45:52',
  observation: 'Manutenção externa',
  driver: 'João da Silva',
  wagon: 'ABC2345',
  communication: 'Celular',
  macro: true,
  embeddedIntelligence: true,
  bait: true,
  temperature: '30ºC',
  status,
});

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {

  constructor() { }

  getAll(): Monitoring[] {
    return [
      monitoringItem(getRandomStatus()),
      monitoringItem(getRandomStatus()),
      monitoringItem(getRandomStatus()),
      monitoringItem(getRandomStatus()),
      monitoringItem(getRandomStatus()),
      monitoringItem(getRandomStatus()),
      monitoringItem(getRandomStatus()),
      monitoringItem(getRandomStatus()),
      monitoringItem(getRandomStatus()),
      monitoringItem(getRandomStatus()),
      monitoringItem(getRandomStatus()),
      monitoringItem(getRandomStatus()),
      monitoringItem(getRandomStatus()),
      monitoringItem(getRandomStatus()),
      monitoringItem(getRandomStatus()),
      monitoringItem(getRandomStatus()),
      monitoringItem(getRandomStatus()),
      monitoringItem(getRandomStatus()),
      monitoringItem(getRandomStatus()),
      monitoringItem(getRandomStatus()),
      monitoringItem(getRandomStatus()),
      monitoringItem(getRandomStatus()),
      monitoringItem(getRandomStatus()),
    ];
  }

  getMapData(id: string): MonitoringMapData {
    return {
      directions: {
        origin: { lat: 40.7128, lng: -74.0060 },
        destination: { lat: 34.0522, lng: -118.2437 },
      },
      calculatedArrival: '01/01/2021 12:00:00',
      lastUpdatedAt: '01/01/2021 12:00:00',
      timeToArrival: '10:30:00',
      distanceToArrival: '10 km',
      leadTime: '10:30:00',
      predictedArrival: '01/01/2021 12:00:00',
      predictedDeparture: '01/01/2021 12:00:00',
      travelDuration: '10:30:00',
      route: {
        id: 'bdefe12c-2edb-46ba-b0fb-e3001e360ccb',
        departure: 'Avenida das nações unidas - São Paulo - SP',
        arrival: 'Avenida das nações unidas - São Paulo - SP',
        timeToArrive: '10:30:00',
        distanceToArrive: '10 km',
        timeIdle: '10:30:00',
      },
      nextTravel: {
        predictedArrival: '01/01/2021 12:00:00',
        predictedDeparture: '01/01/2021 12:00:00',
        leadTime: '10:30:00',
        calculatedArrival: '01/01/2021 12:00:00',
        lastUpdatedAt: '01/01/2021 12:00:00',
        distanceToArrival: '10 km',
        timeToArrival: '10:30:00',
      }
    };
  }
}
