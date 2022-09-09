import { HttpClient } from '@angular/common/http'
import {
  Component,
  OnInit
} from '@angular/core'
import { Router } from '@angular/router'
import { NzMessageService } from 'ng-zorro-antd/message'

import { TableService } from '../../shared/services/table.service'
import { Driver, DriversService } from '../drivers.service'

interface DataItem {
  id: number
  name: string
  cpf: string
  cnh: string
  cnhCategory: string
  cnhExpiration: string
  cellphone: string
  profilePhoto: string
}

@Component({
  selector: 'app-drivers-list',
  templateUrl: './drivers-list.component.html',
  styleUrls: [ './drivers-list.component.css' ]
})
export class DriversListComponent implements OnInit {

  isLoading = false
  displayData = []
  searchInput: string

  driverColumn = [
    {
      title: 'Nome',
      compare: (
        a: Driver,
        b: Driver
      ) => a.name.localeCompare(b.name)
    },
    { title: 'CPF' },
    { title: 'CNH' },
    { title: 'Categoria' },
    { title: 'Validade' },
    { title: 'Ações' }
  ]

  constructor(
    private router: Router,
    private tableService: TableService,
    private driversService: DriversService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.isLoading = true
    this.driversService.getAll().subscribe(
      (data: Driver[]) => {
        this.displayData = data
        this.isLoading = false
      },
      () => {
        this.message.error('Falha ao carregar motoristas')
        this.isLoading = false
      }
    )
  }

  search() {
    this.displayData = this.tableService.search(
      this.searchInput,
      this.displayData
    )
  }

  create() {
    this.router.navigate(['/drivers/driver-create'])
  }

  edit(item: Driver) {
    this.router.navigate(['/drivers/driver-edit', item.id])
  }

}
