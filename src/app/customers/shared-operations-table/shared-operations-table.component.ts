import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GetAllResponse, getCurrentPage} from "../../shared/services/api.service";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {SharedOperationsItem} from "../shared-operations.service";

@Component({
  selector: 'app-shared-operations-table',
  templateUrl: './shared-operations-table.component.html',
  styleUrls: ['./shared-operations-table.component.css']
})
export class SharedOperationsTableComponent {

  @Input() sharedOperations: GetAllResponse<SharedOperationsItem> = null;
  @Output() onEdit: EventEmitter<SharedOperationsItem> = new EventEmitter<SharedOperationsItem>();
  @Output() onDelete: EventEmitter<SharedOperationsItem> = new EventEmitter<SharedOperationsItem>();
  @Output() onPaginate: EventEmitter<string> = new EventEmitter<string>();


  sharedOperationsOrderColumn = [
    {title: 'ID'},
    {title: 'Nome'},
    {title: 'Email'},
    {title: 'Ações'}
  ];

  get page(): number {
    return getCurrentPage(this.sharedOperations);
  }

  constructor() {
  }

  edit(item: SharedOperationsItem): void {
    this.onEdit.emit(item);
  }

  delete(item: SharedOperationsItem): void {
    this.onDelete.emit(item);
  }

  handleQueryParamsChange(params: NzTableQueryParams): void {
    if (params.pageIndex < this.page) {
      this.onPaginate.emit(this.sharedOperations.previous);
    } else if (params.pageIndex > this.page) {
      this.onPaginate.emit(this.sharedOperations.next);
    }
  }

}
