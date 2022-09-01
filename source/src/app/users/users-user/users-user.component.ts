import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-users-user',
  templateUrl: './users-user.component.html',
  styleUrls: ['./users-user.component.css']
})
export class UsersUserComponent implements OnInit {
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private messageService: NzMessageService,
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

  onSave(value: any) {
    this.isLoading = true
    setTimeout(() => {
      this.isLoading = false
      this.messageService.success('Dados salvos com sucesso!')
    }, 666)
  }
}
