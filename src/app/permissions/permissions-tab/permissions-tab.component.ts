import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TransferChange, TransferItem} from 'ng-zorro-antd/transfer';
import {PermissionsService} from '../../shared/services/permissions.service';

@Component({
  selector: 'app-permissions-tab',
  templateUrl: './permissions-tab.component.html',
  styleUrls: ['./permissions-tab.component.css']
})
export class PermissionsTabComponent implements OnInit {
  list: TransferItem[] = [];
  selectedPermissions: number[] = [];

  @Input() targetKeys: string[] = [];
  @Output() save: EventEmitter<number[]> = new EventEmitter<number[]>();

  constructor(
    private permissionService: PermissionsService,
  ) { }

  ngOnInit(): void {
    this.permissionService.getAll().subscribe(data => {
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

  savePermissions(): void {
    this.save.emit(this.selectedPermissions);
  }

}
