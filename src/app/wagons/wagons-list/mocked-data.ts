import { Wagon } from "./wagons-list.component";

export const wagonsList: Wagon[] = [
  {
    id: 1,
    brand: 'Volvo',
    model: 'V70',
    year: 2019,
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
    brand: 'Volvo',
    model: 'XC60',
    year: 2019,
    color: 'Vermelho',
    plate: 'ABC-1235',
    trackers: [
      {
        trackingSystem: '2',
        trackingModel: '2',
        trackingSerialNumber: '123456789',
        id: 2,
        main: true
      }
    ]
  }
]

