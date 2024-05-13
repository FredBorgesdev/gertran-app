import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { TableService } from '../../shared/services/table.service';
import { Driver, DriversService } from '../drivers.service';
import { BaseCrudListComponent } from '../../base-crud/base-crud-list/base-crud-list.component';

@Component({
  selector: 'app-drivers-list',
  templateUrl: './drivers-list.component.html',
  styleUrls: [ './drivers-list.component.css' ]
})
export class DriversListComponent extends BaseCrudListComponent<Driver> {

  isLoading = false;
  searchInput: string;

  driverColumn = [
    { title: 'ID' },
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
  ];

  constructor(
    router: Router,
    tableService: TableService,
    driversService: DriversService,
    message: NzMessageService,
    modal: NzModalService,
  ) {
    super('drivers', router, driversService, message, modal);
  }

  search(): void {
    this.searchByField('search', this.searchInput);
  }

  create(): void {
    this.router.navigate(['/drivers/driver-create', this.getCustomerUUID()]);
  }

  edit(item: Driver): void {
    this.router.navigate(['/drivers/driver-edit', item.id,this.getCustomerUUID() ]);
  }
  
  getCustomerUUID(){
    const currentUrl = window.location.href;
    const urlParts = currentUrl.split('/');
    const uuid = urlParts[urlParts.length - 1];
    return uuid
  }

  delete(item: Driver): void {
    this.modal.confirm({
      nzTitle: 'Você tem certeza que deseja excluir este motorista?',
      nzOnOk: () => {
        this.service.delete(item.id).subscribe(
          () => {
            this.message.success('Motorista excluído com sucesso');
            this.loadResources();
          },
          () => this.message.error('Falha ao excluir motorista')
        );
      }
    });
  }
}
