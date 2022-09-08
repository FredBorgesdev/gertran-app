import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BranchOffice } from '../branch-offices.service';

@Component({
  selector: 'app-branch-office-table',
  templateUrl: './branch-office-table.component.html',
  styleUrls: ['./branch-office-table.component.css']
})
export class BranchOfficeTableComponent implements OnInit {

  @Input() branchOffices: BranchOffice[] = []
  @Output() onEdit: EventEmitter<BranchOffice> = new EventEmitter<BranchOffice>()
  @Output() onDelete: EventEmitter<BranchOffice> = new EventEmitter<BranchOffice>()

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
