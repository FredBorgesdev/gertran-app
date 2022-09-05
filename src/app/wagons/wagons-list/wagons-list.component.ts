import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Tracker } from 'src/app/trackers/trackers-form/trackers-form.component'

import { TableService } from '../../shared/services/table.service'
import { wagonsList } from './mocked-data'

export interface Wagon {
  id: number
  brand: string
  model: string
  year: number
  color: string
  plate: string
  trackers: Tracker[]
}

@Component({
  selector: 'app-wagons-list',
  templateUrl: './wagons-list.component.html',
  styleUrls: ['./wagons-list.component.css']
})
export class WagonsListComponent implements OnInit {

  isLoading = false
  displayData = []
  searchInput: string

  wagonColumn = [
    {
      title: 'ID',
      compare: (
        a: Wagon,
        b: Wagon
      ) => a.id - b.id
    },
    {
      title: 'Placa',
      compare: (
        a: Wagon,
        b: Wagon
      ) => a.plate.localeCompare(b.plate)
    },
    {
      title: 'Marca',
      compare: (
        a: Wagon,
        b: Wagon
      ) => a.brand.localeCompare(b.brand)
    },
    {
      title: 'Modelo',
      compare: (
        a: Wagon,
        b: Wagon
      ) => a.model.localeCompare(b.model)
    },
    { title: 'Ano' },
    { title: 'Cor' },
    { title: 'Ações' }
  ]

  wagonsList = wagonsList

  constructor(
    private router: Router,
    private tableService: TableService
  ) {
    this.isLoading = true
    setTimeout(
      () => {
        this.isLoading = false
        this.displayData = this.wagonsList
      },
      333
    )
  }

  ngOnInit(): void {
  }

  search() {
    const data = this.wagonsList
    this.displayData = this.tableService.search(
      this.searchInput,
      data
    )
  }

  create() {
    this.router.navigate([ '/wagons/wagons-create' ])
  }

  edit(item: Wagon) {
    this.router.navigate([ '/wagons/wagons-edit', item.id ])
  }

}
