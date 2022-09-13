import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { <%= classify(name) %>Service, <%= classify(name) %> } from '../<%= dasherize(name) %>.service';
import { BaseCrudListComponent } from '../../base-crud/base-crud-list/base-crud-list.component';

@Component({
  selector: 'app-<%= dasherize(name) %>-list',
  templateUrl: './<%= dasherize(name) %>-list.component.html',
  styleUrls: ['./<%= dasherize(name) %>-list.component.css'],
})
export class <%= classify(name) %>ListComponent extends BaseCrudListComponent<<%= classify(name) %>> {
  <%= camelize(name) %>Columns = [
    { title: 'Id' },
    { title: 'Nome' },
    { title: 'Ações' },
  ]

  constructor(
    router: Router,
    service: <%= classify(name) %>Service,
    message: NzMessageService,
    modal: NzModalService,
  ) {
    super(
      '<%= dasherize(name) %>',
      router,
      service,
      message,
      modal,
    );
  }

  loadResources(url?: string): void {
    this.isLoading = true;
    this.service.getAll({ url }).subscribe((data) => {
      this.resources = data;
      this.isLoading = false;
    });
  }
}
