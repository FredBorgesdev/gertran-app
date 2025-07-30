import { Component } from '@angular/core';
import { GertranDirect, GertranDirectService } from '../gertran-direct.service';
import { BaseCrudListComponent } from 'src/app/base-crud/base-crud-list/base-crud-list.component';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'gertran-direct-approval',
  templateUrl: './gertran-direct-approval.component.html',
  styleUrls: ['gertran-direct-approval.component.css']
})
export class GertranDirectApprovalComponent extends BaseCrudListComponent<GertranDirect> {
  searchInput: string;
  fromDate?: Date;
  toDate?: Date;

  personalMonitoringColumns = [
    { title: 'Nome' },
    { title: 'Empresa' },
    { title: 'Ações' },
  ];

  constructor(
    gertranDirectService: GertranDirectService,
    router: Router,
    modal: NzModalService,
    message: NzMessageService
  ) {
    super('GertranApproval', router, gertranDirectService, message, modal);
  }






  search(): void {
    this.searchByField('search', this.searchInput);
  }

override additionalParams(): any[] {
  const params: any = {};

  if (this.fromDate) {
    params.from_date = this.formatDate(this.fromDate);
  } else {
    params.from_date = '2025-06-01'; // ou default
  }

  if (this.toDate) {
    params.to_date = this.formatDate(this.toDate);
  } else {
    params.to_date = '2025-07-01'; // ou default
  }

  if (this.searchInput && this.searchInput.trim() !== '') {
    params.search = this.searchInput.trim();
  }

  return [params];
}

formatDate(date?: Date): string | undefined {
  if (!date || isNaN(date.getTime())) return undefined;
  return date.toISOString().split('T')[0]; // 'YYYY-MM-DD'
}


  edit(item: GertranDirect): void {
    this.router.navigate(['/gertran-direct/edit', item.id]);
  }

  viewDetails(item: GertranDirect): void {
    this.router.navigate(['/gertran-direct/details', item.id]);
  }

  goToCreate(): void {
    this.router.navigate(['/gertran-direct/create']);
  }
}