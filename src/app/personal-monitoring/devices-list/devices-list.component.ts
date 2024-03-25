import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {PersonalMonitoringService, PersonalMonitoring} from '../personal-monitoring.service';
import {BaseCrudListComponent} from '../../base-crud/base-crud-list/base-crud-list.component';

@Component({
  selector: 'devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css']
})
export class PersonalMonitoringDevicesListComponent extends BaseCrudListComponent<PersonalMonitoring> {
  searchInput: string;

  personalMonitoringColumns = [
    {title: 'ID'},
    {title: 'Usuário'},
    {title: 'ID device'},
    {title: 'Ações'},
  ];

  constructor(
    personalMonitoringService: PersonalMonitoringService,
    router: Router,
    modal: NzModalService,
    message: NzMessageService
  ) {
    super(
      'device',
      router,
      personalMonitoringService,
      message,
      modal,
    );
  }


  search(): void {
    this.searchByField('search', this.searchInput);
  }
}
