import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { GetAllResponse } from 'src/app/shared/services/api.service';
import { UserCustomerBranchOffice, UserCustomerBranchOfficeService } from '../../user-customer-branch-office.service';

@Component({
  selector: 'app-user-customer-branch-office-tab',
  templateUrl: './user-customer-branch-office-tab.component.html',
  styleUrls: ['./user-customer-branch-office-tab.component.css']
})
export class UserCustomerBranchOfficeTabComponent implements OnInit {
  @Input() customerLoaded = [];
  @Input() userLoaded = null;


  hasCustomerLoaded = null;
  hasUserLoaded = null;

  isLoading = false;
  isCreating = false;
  items: GetAllResponse<UserCustomerBranchOffice> = null;
  selected: UserCustomerBranchOffice = null;

  constructor(
    private service: UserCustomerBranchOfficeService,
    private message: NzMessageService,
    private modal: NzModalService,
  ) {}

  getUserCustomerFilters(){
    const customerLoaded = this.customerLoaded.find(item => item !== undefined);
    const filters = {customer:customerLoaded, user:this.userLoaded}
    this.hasCustomerLoaded = customerLoaded
    this.hasUserLoaded = this.userLoaded
    return filters
  }

  ngOnInit(): void {

    this.load(null,this.getUserCustomerFilters());
  }

  load(url?: string, filters?:any) {
    this.isLoading = true;
    this.service.getAll({ url },filters).subscribe({
      next: (res) => this.items = res,
      error: () => this.message.error('Erro ao carregar registros'),
      complete: () => this.isLoading = false,
    });
  }

  save(data: UserCustomerBranchOffice) {
    this.isLoading = true;

    const obs = data.id
      ? this.service.update(data.id, data)
      : this.service.save(data);

    obs.subscribe({
      next: () => this.handleSuccess(),
      error: () => this.message.error('Erro ao salvar'),
    });
  }

  edit(item: UserCustomerBranchOffice) {
    this.selected = item;
    this.isCreating = true;
  }

  delete(item: UserCustomerBranchOffice) {
    this.modal.confirm({
      nzTitle: 'Confirmar exclusão?',
      nzContent: 'Esta ação não pode ser desfeita.',
      nzOnOk: () => {
        this.isLoading = true;
        this.service.delete(item.id).subscribe({
          next: () => this.handleSuccess(),
          error: () => this.message.error('Erro ao excluir'),
        });
      }
    });
  }

  private handleSuccess() {
    this.isCreating = false;
    this.selected = null;
    this.message.success('Sucesso!');
    this.load(null,this.getUserCustomerFilters());
  }
}
