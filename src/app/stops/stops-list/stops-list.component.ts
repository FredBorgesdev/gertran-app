import { Component, OnInit } from '@angular/core';
import { stopsList, stopsListTypeCategories, stopsListTypes } from './mocked-data';

export interface DataItem {
  id: number
  name: string
  description: string
  address: string
  state: string
  city: string
  lat?: number
  lng?: number
  radius: number
  typeId: number
  typeCategoryId: number
  workingHours?: {
    [key: string]: {
      start: string
      end: string
      fullDay: boolean
      expectedG2g: string
      hiredG2g: string
      checkedG2g: string
    }
  }
}

@Component({
  selector: 'app-stops-list',
  templateUrl: './stops-list.component.html',
  styleUrls: ['./stops-list.component.css']
})
export class StopsListComponent implements OnInit {
  isLoading = false

  stopsList: DataItem[] = []
  stopsListTypes = stopsListTypes
  stopsListTypeCategories = stopsListTypeCategories

  searchInput: string = ''

  stopColumns = [
    {
      title: 'ID',
      compare: (
        a: DataItem,
        b: DataItem
      ) => a.id - b.id
    },
    {
      title: 'Nome',
      compare: (
        a: DataItem,
        b: DataItem
      ) => a.name.localeCompare(b.name)
    },
    {
      title: 'Descrição',
      compare: (
        a: DataItem,
        b: DataItem
      ) => a.description.localeCompare(b.description)
    },
    {
      title: 'Endereço',
      compare: (
        a: DataItem,
        b: DataItem
      ) => a.address.localeCompare(b.address)
    },
    { title: 'Raio' },
    { title: 'Tipo' },
    { title: 'Ações' },
  ]

  constructor() { }

  ngOnInit(): void {
    this.isLoading = true

    setTimeout(() => {
      this.stopsList = stopsList
      this.isLoading = false
    }, 333)
  }

  getStopTypeName(id: number) {
    return this.stopsListTypes.find(type => type.id === id)?.name
  }

  create() {}

  edit() {}
}
