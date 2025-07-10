import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MobileAccessService, MobileAccess } from '../mobile-access.service';
import { BaseCrudListComponent } from '../../base-crud/base-crud-list/base-crud-list.component';

@Component({
  selector: 'app-mobile-access-list',
  templateUrl: './mobile-access-list.component.html',
  styleUrls: ['./mobile-access-list.component.css']
})
export class MobileAccessListComponent extends BaseCrudListComponent<MobileAccess> {

columns = [
  { title: 'Tipo de cobrança' },
  { title: 'Início' },
  { title: 'Fim' },
  { title: 'Cliente' },
  { title: 'Permissão' },
  { title: 'Ações' },
];

  searchInput = '';

  constructor(
    service: MobileAccessService,
    router: Router,
    modal: NzModalService,
    message: NzMessageService
  ) {
    super(
      'mobile-access',
      router,
      service,
      message,
      modal,
    );
  }
}
