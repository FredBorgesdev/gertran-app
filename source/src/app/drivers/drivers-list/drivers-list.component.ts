import {
  Component,
  OnInit
} from '@angular/core'
import { Router } from '@angular/router'

import { TableService } from '../../shared/services/table.service'

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
      title: 'CPF'
    },
    {
      title: 'CNH'
    },
    {
      title: 'Categoria'
    },
    {
      title: 'Validade'
    },
    {
      title: 'Celular'
    },
    {
      title: 'Ações'
    }
  ]

  driversList: DataItem[] = [
    {
      id: 1,
      name: 'João',
      cpf: '111.111.111-11',
      cnh: '123456789',
      cnhCategory: 'AE',
      cnhExpiration: '20/20/2020',
      cellphone: '(11) 99999-9999',
      profilePhoto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRjkIZc1kOSO-A2njZqJ_xJVBiti5XrAwVHqKsXbXqFSEioDbaZvYwteEQLITv0dV3mLs&usqp=CAU'
    },
    {
      id: 2,
      name: 'Maria',
      cpf: '222.222.222-22',
      cnh: '123456789',
      cnhCategory: 'AE',
      cnhExpiration: '20/20/2020',
      cellphone: '(11) 99999-9999',
      profilePhoto: 'https://conteudo.imguol.com.br/c/entretenimento/fc/2021/04/20/dayana-morais-da-cruz-1618961307572_v2_300x225.jpg'
    },
    {
      id: 4,
      name: 'Tobias',
      cpf: '111.111.111-11',
      cnh: '123456789',
      cnhCategory: 'AE',
      cnhExpiration: '20/20/2020',
      cellphone: '(11) 99999-9999',
      profilePhoto: ''
    },
    {
      id: 3,
      name: 'José',
      cpf: '333.333.333-33',
      cnh: '123456789',
      cnhCategory: 'AE',
      cnhExpiration: '20/20/2020',
      cellphone: '(11) 99999-9999',
      profilePhoto: 'https://img.ibxk.com.br/materias/7057/27038.jpg'
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
        this.displayData = this.driversList
      },
      333
    )
  }

  ngOnInit(): void {
  }

  search() {
    const data = this.driversList
    this.displayData = this.tableService.search(
      this.searchInput,
      data
    )
  }

  create() {
    this.router.navigate([ '/drivers/driver-create' ])
  }

  edit(item: DataItem) {
    this.router.navigate([ '/drivers/driver-edit', item.id ])
  }

}
