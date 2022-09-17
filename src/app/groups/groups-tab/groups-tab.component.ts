import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TransferChange, TransferItem} from 'ng-zorro-antd/transfer';
import {GroupsService} from '../groups.service';

@Component({
  selector: 'app-groups-tab',
  templateUrl: './groups-tab.component.html',
  styleUrls: ['./groups-tab.component.css']
})
export class GroupsTabComponent implements OnInit {
  list: TransferItem[] = [];
  selectedPermissions: number[] = [];

  @Input() targetKeys: string[] = [];
  @Output() save: EventEmitter<number[]> = new EventEmitter<number[]>();

  constructor(
    private groupService: GroupsService,
  ) { }

  ngOnInit(): void {
    this.groupService.getAll({ limit: 999 }).subscribe(data => {
      this.list = data.results.map(item => ({
        id: item.id,
        title: item.name,
        direction: this.targetKeys.includes(item.id.toString()) ? 'right' : 'left',
      }));
    });
  }

  change(transferChange: TransferChange): void {
    this.selectedPermissions = transferChange.list
      .filter(item => item.direction === 'right')
      .map(item => item.id);
  }

  saveGroups(): void {
    this.save.emit(this.selectedPermissions);
  }

}
