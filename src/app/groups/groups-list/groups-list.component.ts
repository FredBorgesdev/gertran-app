import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import {Group, GroupsService} from '../groups.service';
import { BaseCrudListComponent } from '../../base-crud/base-crud-list/base-crud-list.component';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {TableService} from '../../shared/services/table.service';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent extends BaseCrudListComponent<Group> {
  searchInput: string;

  groupsColumn = [
    {
      title: 'Nome do grupo',
      compare: (a: Group, b: Group) => a.name.localeCompare(b.name)
    },
    { title: 'Ações' }
  ];

  constructor(
    private tableService: TableService,
    router: Router,
    service: GroupsService,
    message: NzMessageService,
    modal: NzModalService
  ) {
    super(
      'groups',
      router,
      service,
      message,
      modal
    );
  }

  search(): void {
    const data = this.resources;
    this.resources.results = this.tableService.search(this.searchInput, data.results);
  }
}
