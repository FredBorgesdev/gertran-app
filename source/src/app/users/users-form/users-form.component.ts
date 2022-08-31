import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core'
import {
  ActivatedRoute,
  Router
} from '@angular/router'

import { NzMessageService } from 'ng-zorro-antd/message'
import { TransferItem } from 'ng-zorro-antd/transfer'

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: [ './users-form.component.css' ]
})
export class UsersFormComponent implements OnInit {

  usersList = [
    {
      id: 1,
      name: 'João',
      cpf: '111.111.111-11',
      email: 'joao@empresa.com',
      cellphone: '(11) 99999-9999'
    },
    {
      id: 2,
      name: 'Maria',
      cpf: '222.222.222-22',
      email: 'maria@empresa.com',
      cellphone: '(11) 99999-9999'
    },
    {
      id: 3,
      name: 'José',
      cpf: '333.333.333-33',
      email: 'jose@empresa.com',
      cellphone: '(11) 99999-9999'
    }
  ]
  user = null
  isLoading = false

  list: TransferItem[] = [
    {
      id: 1,
      title: 'Motoristas',
    },
    {
      id: 2,
      title: 'Visualizar Motoristas',
    },
    {
      id: 3,
      title: 'Adicionar Motorista',
    },
    {
      id: 4,
      title: 'Editar Motorista',
    },
    {
      id: 5,
      title: 'Excluir Motorista',
    },
    {
      id: 6,
      title: 'Clientes',
    },
    {
      id: 7,
      title: 'Visualizar Clientes',
    },
    {
      id: 8,
      title: 'Adicionar Cliente',
    },
    {
      id: 9,
      title: 'Editar Cliente',
    },
    {
      id: 10,
      title: 'Excluir Cliente',
    },
    {
      id: 11,
      title: 'Veiculos',
    },
    {
      id: 12,
      title: 'Visualizar Veiculos',
    },
    {
      id: 13,
      title: 'Adicionar Veiculo',
    },
    {
      id: 14,
      title: 'Editar Veiculo',
    },
    {
      id: 15,
      title: 'Excluir Veiculo',
    }
  ]

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: NzMessageService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.snapshot.paramMap.has('id') ? this.loadUser() : this.createNewUser()
  }

  loadUser() {
    this.isLoading = true
    setTimeout(
      () => {
        this.user = this.usersList.find(user => user.id === +this.activatedRoute.snapshot.paramMap.get('id'))
        this.isLoading = false
      },
      666
    )
  }

  createNewUser() {
    this.user = {
      id: null,
      name: '',
      cpf: '',
      email: '',
      cellphone: ''
    }
  }

  save() {
    this.isLoading = true
    setTimeout(() => {
        this.isLoading = false
        this.messageService.success('Dados salvos com sucesso!')
      }
      ,
      666)
  }

  listUsers() {
    this.router.navigate([ '/users/users-list' ])
  }

  private generateTree(arr: TransferItem[]): TransferItem[] {
    const tree: TransferItem[] = []
    // tslint:disable-next-line:no-any
    const mappedArr: any = {}
    let arrElem: TransferItem
    let mappedElem: TransferItem

    for (let i = 0, len = arr.length; i < len; i++) {
      arrElem = arr[ i ]
      mappedArr[ arrElem.id ] = { ...arrElem }
      mappedArr[ arrElem.id ].children = []
    }

    for (const id in mappedArr) {
      if (mappedArr.hasOwnProperty(id)) {
        mappedElem = mappedArr[ id ]
        if (mappedElem.parentid) {
          mappedArr[ mappedElem.parentid ].children.push(mappedElem)
        } else {
          tree.push(mappedElem)
        }
      }
    }
    return tree
  }

  select(ret: {}): void {
    console.log('nzSelectChange', ret);
  }

  change(ret: {}): void {
    console.log('nzChange', ret);
  }

}
