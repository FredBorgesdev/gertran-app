import {
  Component,
  OnInit
} from '@angular/core'
import { Router } from '@angular/router'

import { TableService } from '../../shared/services/table.service'

interface DataItem {
  id: number
  brand: string
  model: string
  year: number
  color: string
  plate: string
  trackingSystem: string
  trackingModel: string
  trackingSerialNumber: string
}

@Component({
  selector: 'app-trucks-list',
  templateUrl: './trucks-list.component.html',
  styleUrls: [ './trucks-list.component.css' ]
})
export class TrucksListComponent implements OnInit {

  isLoading = false
  displayData = []
  searchInput: string

  truckColumn = [
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
    // {
    //   title: 'Ano'
    // },
    // {
    //   title: 'Cor'
    // },
    {
      title: 'Sis. Rastreamento'
    },
    {
      title: 'Modelo'
    },
    {
      title: 'Número de Série'
    },
    {
      title: 'Ações'
    }
  ]

  trucksList: DataItem[] = [
    {
      id: 1,
      brand: 'Ford',
      model: 'Fusion',
      year: 2020,
      color: 'Azul',
      plate: 'ABC-1234',
      trackingSystem: 'JaburSat',
      trackingModel: 'JB-SAT-1',
      trackingSerialNumber: '123456789'
    },
    {
      id: 2,
      brand: 'Chevrolet',
      model: 'Onix',
      year: 2020,
      color: 'Vermelho',
      plate: 'ABC-1234',
      trackingSystem: 'JaburSat',
      trackingModel: 'JB-SAT-1',
      trackingSerialNumber: '123456789'
    },
    {
      id: 3,
      brand: 'Fiat',
      model: 'Uno',
      year: 2020,
      color: 'Preto',
      plate: 'ABC-1234',
      trackingSystem: 'JaburSat',
      trackingModel: 'JB-SAT-2',
      trackingSerialNumber: '123456789'
    },
    {
      id: 4,
      brand: 'Toyota',
      model: 'Corolla',
      year: 2020,
      color: 'Branco',
      plate: 'ABC-1234',
      trackingSystem: 'OmniLink',
      trackingModel: 'OM-LINK-1',
      trackingSerialNumber: '123456789'
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
        this.displayData = this.trucksList
      },
      333
    )
  }

  ngOnInit(): void {
  }

  search() {
    const data = this.trucksList
    this.displayData = this.tableService.search(
      this.searchInput,
      data
    )
  }

  create() {
    this.router.navigate([ '/trucks/truck-create' ])
  }

  edit(item: DataItem) {
    this.router.navigate([
      '/trucks/truck-edit',
      item.id
    ])
  }

}
