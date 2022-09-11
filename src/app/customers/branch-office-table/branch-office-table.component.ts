import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { GetAllResponse, getCurrentPage } from 'src/app/shared/services/api.service';
import { BranchOffice } from '../branch-offices.service';

@Component({
  selector: 'app-branch-office-table',
  templateUrl: './branch-office-table.component.html',
  styleUrls: ['./branch-office-table.component.css']
})
export class BranchOfficeTableComponent implements OnInit {

  @Input() branchOffices: GetAllResponse<BranchOffice> = null
  @Output() onEdit: EventEmitter<BranchOffice> = new EventEmitter<BranchOffice>()
  @Output() onDelete: EventEmitter<BranchOffice> = new EventEmitter<BranchOffice>()
  @Output() onPaginate: EventEmitter<string> = new EventEmitter<string>()

  branchOfficesOrderColumn = [
    {
      title: 'Razão social',
      compare: (a: BranchOffice, b: BranchOffice) => a.corporateName.localeCompare(b.corporateName)
    },
    {
      title: 'Nome fantasia',
      compare: (a: BranchOffice, b: BranchOffice) => a.tradingName.localeCompare(b.tradingName)
    },
    {
      title: 'CNPJ',
      compare: (a: BranchOffice, b: BranchOffice) => a.cnpj.localeCompare(b.cnpj)
    },
    {
      title: 'Website',
      compare: (a: BranchOffice, b: BranchOffice) => a.domain.localeCompare(b.domain)
    },
    { title: 'Ações' }
  ]

  get page() {
    return getCurrentPage(this.branchOffices)
  }

  handleQueryParamsChange(params: NzTableQueryParams): void {
    if (params.pageIndex < this.page) {
      this.onPaginate.emit(this.branchOffices.previous)
    } else if (params.pageIndex > this.page) {
      this.onPaginate.emit(this.branchOffices.next)
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

  edit(item: BranchOffice) {
    this.onEdit.emit(item)
  }

  delete(item: BranchOffice) {
    this.onDelete.emit(item)
  }
}
