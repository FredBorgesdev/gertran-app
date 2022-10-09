import { Component, OnInit } from '@angular/core';
import {TerminalGroups, TerminalGroupsService} from '../terminal-groups.service';
import {BaseCrudListComponent} from '../../base-crud/base-crud-list/base-crud-list.component';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-terminal-groups-list',
  templateUrl: './terminal-groups-list.component.html',
  styleUrls: ['./terminal-groups-list.component.css']
})
export class TerminalGroupsListComponent extends BaseCrudListComponent<TerminalGroups> {

  constructor(
    service: TerminalGroupsService,
    router: Router,
    message: NzMessageService,
    modal: NzModalService,
  ) {
    super(
      'terminal-groups',
      router,
      service,
      message,
      modal,
    );
  }
}
