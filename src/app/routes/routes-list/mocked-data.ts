import { stopsList } from 'src/app/stops/stops-list/mocked-data';

export const routesList = [
  {
    id: 1,
    name: 'Rota 1',
    code: 'R1',
    description: 'Rota 1',
    lead: 3,
    stops: [
      {
        stop: stopsList[0],
        stopTypeId: 1
      },
      {
        stop: stopsList[1],
        stopTypeId: 2
      }
    ]
  }
];

export const routesStopTypeList = [
  {
    id: 1,
    name: 'Parada de embarque'
  },
  {
    id: 2,
    name: 'Parada de desembarque'
  },
  {
    id: 3,
    name: 'Ponto principal'
  },
  {
    id: 4,
    name: 'Ponto auxiliar'
  }
];
