import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';

import { TableService } from '../../shared/services/table.service';

interface DataItem {
  id: number;
  name: string;
  cpf: string;
  email: string;
  cellphone: string;
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: [ './users-list.component.css' ]
})
export class UsersListComponent implements OnInit {

  isLoading = false;
  displayData = [];
  searchInput: string;

  userColumn = [
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
      title: 'Email'
    },
    {
      title: 'Celular'
    },
    {
      title: 'Ações'
    }
  ];

  usersList: DataItem[] = [
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
  ];

  constructor(
    private router: Router,
    private tableService: TableService
  ) {
    this.isLoading = true;
    setTimeout(
      () => {
        this.isLoading = false;
        this.displayData = this.usersList;
      },
      333
    );
  }

  ngOnInit(): void {
  }

  search() {
    const data = this.usersList;
    this.displayData = this.tableService.search(
      this.searchInput,
      data
    );
  }

  create() {
    this.router.navigate([ '/users/user-create' ]);
  }

  edit(item: DataItem) {
    this.router.navigate([ '/users/user-edit', item.id ]);
  }

}
