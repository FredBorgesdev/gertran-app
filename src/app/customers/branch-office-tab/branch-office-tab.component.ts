import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { GetAllResponse } from 'src/app/shared/services/api.service';
import { BranchOffice, BranchOfficesService } from '../branch-offices.service';
import { Customer } from '../customers.service';

export interface BranchOfficeDataItem {
  id: number
  companyName: string
  brandName: string
  cnpj: string
  contactName: string
  contactEmail: string
  blocked: boolean
}

@Component({
  selector: 'app-branch-office-tab',
  templateUrl: './branch-office-tab.component.html',
  styleUrls: ['./branch-office-tab.component.css']
})
export class BranchOfficeTabComponent implements OnInit {

  @Input() customer: Customer

  branchOffices: GetAllResponse<BranchOffice> = null

  isLoading = false
  isCreatingBranchOffice = false
  branchOffice: BranchOffice = null

  constructor(
    private branchOfficeService: BranchOfficesService,
    private message: NzMessageService,
    private modal: NzModalService,
  ) { }

  ngOnInit(): void {
    this.loadBranchOffices()
  }

  loadBranchOffices(url?: string) {
    this.isLoading = true
    this.branchOfficeService.getAll({ url }, this.customer.id).subscribe(branchOffices => {
      this.branchOffices = branchOffices
      this.isLoading = false
    }, () => this.handleFailure())
  }


  save(branchOffice: BranchOffice) {
    this.isLoading = true

    if (this.branchOffice?.id) {
      this.branchOfficeService.update(this.branchOffice.id, branchOffice, this.customer.id).subscribe(
        () => this.handleSuccess(),
        () => this.handleFailure()
      )
    } else {
      this.branchOfficeService.save(branchOffice, this.customer.id).subscribe(
        () => this.handleSuccess(),
        () => this.handleFailure()
      )
    }
  }

  edit(branchOffice: BranchOffice) {
    this.isCreatingBranchOffice = true
    this.branchOffice = branchOffice
  }

  delete(branchOffice: BranchOffice) {
    this.modal.confirm({
      nzTitle: 'Tem certeza que deseja excluir esta filial?',
      nzContent: 'Esta ação não pode ser desfeita.',
      nzOkText: 'Sim',
      nzOnOk: () => {
        this.isLoading = true
        this.branchOfficeService.delete(branchOffice.id, this.customer.id).subscribe(
          () => this.handleSuccess(),
          () => this.handleFailure()
        )
      },
    })
  }

  private handleSuccess() {
    this.isCreatingBranchOffice = false
    this.isLoading = false
    this.branchOffice = null
    this.message.success('Filial salva com sucesso')
    this.loadBranchOffices()
  }

  private handleFailure() {
    this.isLoading = false
    this.message.error('Erro ao salvar filial')
  }
}
