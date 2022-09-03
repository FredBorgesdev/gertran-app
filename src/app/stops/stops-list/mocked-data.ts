import { Stop } from "./stops-list.component";

export const stopsList: Stop[] = [
  {
    id: 1,
    name: 'Belo Horizonte – Posto 01',
    description: 'Stop 1 description',
    address: 'Rua 1, 100',
    state: 'MG',
    city: 'Belo Horizonte',
    lat: -19.920000,
    lng: -43.940000,
    radius: 500,
    typeId: 1,
    typeCategoryIds: [2],
  },
  {
    id: 2,
    name: 'Graal Monlevade',
    description: 'Restaurante',
    address: 'Rua 2, 200',
    state: 'MG',
    city: 'João Monlevade',
    lat: -19.750000,
    lng: -43.870000,
    radius: 500,
    typeId: 2,
    typeCategoryIds: [1],
    workingHours: {
      monday: {
        start: '08:00',
        end: '17:00',
        fullDay: false,
        expectedG2g: '00:00:00',
        hiredG2g: '00:00:00',
        checkedG2g: '00:00:00'
      }
    }
  },
]

export const stopsListTypes: any[] = [
  {
    id: 1,
    name: 'Parada final',
  },
  {
    id: 2,
    name: 'Parada intermediária',
  }
]

export const stopsListTypeCategories: any[] = [
  {
    id: 1,
    name: 'Restaurante',
  },
  {
    id: 2,
    name: 'Posto de gasolina',
  }
]
