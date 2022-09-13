import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { GroupsFormComponent } from '../groups-form/groups-form.component';
import { Group } from '../groups.service';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {

  isLoading = false;
  searchInput = '';
  displayData: Group[] = [
    {
      id: '1',
      name: 'Group 1',
    }
  ];

  groupsColumn = [
    {
      title: 'Nome do grupo',
      compare: (a: Group, b: Group) => a.name.localeCompare(b.name)
    },
    { title: 'Ações' }
  ];

  constructor(
    private modal: NzModalService,
  ) { }

  ngOnInit(): void {
  }

  search() {}

  create() {
    this.modal.create({
      nzTitle: 'Criar novo grupo',
      nzContent: GroupsFormComponent,
      nzWidth: '50%',
      nzOkText: 'Salvar',
    });
  }

  edit(group: Group) {
    this.modal.create({
      nzTitle: 'Criar novo grupo',
      nzContent: GroupsFormComponent,
      nzComponentParams: { group },
      nzWidth: '50%',
      nzOkText: 'Salvar',
    });
  }

  delete(group: Group) {
    this.modal.confirm({
      nzTitle: 'Deseja realmente excluir este grupo?',
      nzOnOk: () => this.handleDelete(group)
    });
  }

  private handleDelete(group: Group) {
    this.isLoading = true;
    // this.groupsService.delete(group.id).subscribe(
    //   () => this.handleSuccess(),
    //   () => this.handleFailure()
    // )
  }
}
