import { Component, OnInit } from '@angular/core';
import { TransferItem } from 'ng-zorro-antd/transfer';

@Component({
  selector: 'app-users-permissions',
  templateUrl: './users-permissions.component.html',
  styleUrls: ['./users-permissions.component.css']
})
export class UsersPermissionsComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
  }

  select(ret: {}): void {
    console.log('nzSelectChange', ret);
  }

  change(ret: {}): void {
    console.log('nzChange', ret);
  }
}
