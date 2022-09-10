import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { <%= classify(name) %>Service, <%= classify(name) %> } from '../<%= dasherize(name) %>.service';

@Component({
  selector: 'app-<%= dasherize(name) %>-list',
  templateUrl: './<%= dasherize(name) %>-list.component.html',
  styleUrls: ['./<%= dasherize(name) %>-list.component.css'],
})
export class <%= classify(name) %>ListComponent implements OnInit {
  isLoading = false
  <%= camelize(name) %>List: <%= classify(name) %>[] = []

  <%= camelize(name) %>Columns = [
    { title: 'Id' },
    { title: 'Nome' },
    { title: 'Ações' },
  ]

  constructor(
    private router: Router,
    private service: <%= classify(name) %>Service,
    private message: NzMessageService,
    private modal: NzModalService,
  ) { }

  ngOnInit(): void {
    this.isLoading = true
    this.service.getAll().subscribe((data) => {
      this.<%= camelize(name) %>List = data
      this.isLoading = false
    })
  }

  create(){
    this.router.navigate(['/<%= dasherize(name) %>', '<%= dasherize(name) %>-create'])
  }

  edit(item: <%= classify(name) %>){
    this.router.navigate(['/<%= dasherize(name) %>', '<%= dasherize(name) %>-edit', item.id])
  }

  delete(item: <%= classify(name) %>) {
    this.modal.confirm({
      nzTitle: 'Deseja realmente excluir?',
      nzContent: 'Essa ação não poderá ser desfeita',
      nzOkText: 'Sim',
      nzOnOk: () => this.handleDelete(item.id),
    })
  }

  handleDelete(id: string) {
    this.isLoading = true
    this.service.delete(id).subscribe(() => {
      this.<%= camelize(name) %>List = this.<%= camelize(name) %>List.filter(
        (item) => item.id !== id
      )
      this.message.success('<%= ptName %> excluído com sucesso')
      this.isLoading = false
    }, () => {
      this.message.error('Erro ao excluir <%= ptName %>')
      this.isLoading = false
    })
  }
}
