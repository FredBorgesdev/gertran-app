import { Truck } from './trucks-list.component';

export const trucksList: Truck[] = [
    {
      id: 1,
      brand: 'Ford',
      model: 'Fusion',
      year: 2020,
      color: 'Azul',
      plate: 'ABC-1234',
      trackers: [
        {
          id: 1,
          trackingSystem: '1',
          trackingModel: '1',
          trackingSerialNumber: '123456789',
          main: false
        }
      ]
    },
    {
      id: 2,
      brand: 'Chevrolet',
      model: 'Onix',
      year: 2020,
      color: 'Vermelho',
      plate: 'ABC-1234',
      trackers: [
        {
          trackingSystem: '2',
          trackingModel: '2',
          trackingSerialNumber: '123456789',
          id: 2,
          main: true
        }
      ]
    },
    {
      id: 3,
      brand: 'Fiat',
      model: 'Uno',
      year: 2020,
      color: 'Preto',
      plate: 'ABC-1234',
      trackers: [
        {
          trackingSystem: '3',
          trackingModel: '3',
          trackingSerialNumber: '123456789',
          id: 4,
          main: false
        }
      ]
    },
    {
      id: 4,
      brand: 'Toyota',
      model: 'Corolla',
      year: 2020,
      color: 'Branco',
      plate: 'ABC-1234',
      trackers: [
        {
          trackingSystem: '4',
          trackingModel: '4',
          trackingSerialNumber: '123456789',
          id: 5,
          main: true
        }
      ]
    }
  ];

