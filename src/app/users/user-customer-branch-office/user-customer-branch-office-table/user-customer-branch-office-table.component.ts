import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { GetAllResponse, getCurrentPage } from 'src/app/shared/services/api.service';
import { UserCustomerBranchOffice } from '../../user-customer-branch-office.service';

@Component({
  selector: 'app-user-customer-branch-office-table',
  templateUrl: './user-customer-branch-office-table.component.html',
  styleUrls: ['./user-customer-branch-office-table.component.css']
})
export class UserCustomerBranchOfficeTableComponent {
  @Input() items: GetAllResponse<UserCustomerBranchOffice> = null;
  @Output() onEdit = new EventEmitter<UserCustomerBranchOffice>();
  @Output() onDelete = new EventEmitter<UserCustomerBranchOffice>();
  @Output() onPaginate = new EventEmitter<string>();

  get page() {
    return getCurrentPage(this.items);
  }

  handleQueryParamsChange(params: NzTableQueryParams): void {
    if (params.pageIndex < this.page) {
      this.onPaginate.emit(this.items.previous);
    } else if (params.pageIndex > this.page) {
      this.onPaginate.emit(this.items.next);
    }
  }

  edit(item: UserCustomerBranchOffice) {
    this.onEdit.emit(item);
  }

  delete(item: UserCustomerBranchOffice) {
    this.onDelete.emit(item);
  }
}
