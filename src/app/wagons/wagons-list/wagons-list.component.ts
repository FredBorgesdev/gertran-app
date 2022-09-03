import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { TableService } from '../../shared/services/table.service'

interface DataItem {
  id: number
  brand: string
  model: string
  year: number
  color: string
  plate: string
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
        a: DataItem,
        b: DataItem
      ) => a.id - b.id
    },
    {
      title: 'Placa',
      compare: (
        a: DataItem,
        b: DataItem
      ) => a.plate.localeCompare(b.plate)
    },
    {
      title: 'Marca',
      compare: (
        a: DataItem,
        b: DataItem
      ) => a.brand.localeCompare(b.brand)
    },
    {
      title: 'Modelo',
      compare: (
        a: DataItem,
        b: DataItem
      ) => a.model.localeCompare(b.model)
    },
    {
      title: 'Ano'
    },
    {
      title: 'Cor'
    },
    {
      title: 'Ações'
    }
  ]

  wagonsList: DataItem[] = [
    {
      id: 1,
      brand: 'Volvo',
      model: 'V70',
      year: 2019,
      color: 'Azul',
      plate: 'ABC-1234'
    },
    {
      id: 2,
      brand: 'Volvo',
      model: 'XC60',
      year: 2019,
      color: 'Vermelho',
      plate: 'ABC-1235'
    }
  ]

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

  edit(item: DataItem) {
    this.router.navigate([ '/wagons/wagons-edit', item.id ])
  }

}
