import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TransferItem} from 'ng-zorro-antd/transfer';
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
  @Input() hideSubmit: boolean = false;
  @Output() save: EventEmitter<number[]> = new EventEmitter<number[]>();
  @Output() change: EventEmitter<number[]> = new EventEmitter<number[]>();

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

  changeTransfer(): void {
    this.selectedPermissions = this.list
      .filter(item => item.direction === 'right')
      .map(item => item.id);

    this.change?.emit(this.selectedPermissions);
  }

  savePermissions(): void {
    this.save.emit(this.selectedPermissions);
  }

}
