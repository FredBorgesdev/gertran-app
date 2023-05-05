import {Component, Input, OnInit} from '@angular/core';
import {GetAllResponse} from "../../shared/services/api.service";
import {Customer} from "../customers.service";
import {ContactsService} from "../contacts.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzModalService} from "ng-zorro-antd/modal";
import {SharedOperationsItem, SharedOperationsService} from "../shared-operations.service";

@Component({
  selector: 'app-shared-operations-tab',
  templateUrl: './shared-operations-tab.component.html',
  styleUrls: ['./shared-operations-tab.component.css']
})
export class SharedOperationsTabComponent implements OnInit {

  @Input() customer: Customer;

  sharedOperationsDisplayData: GetAllResponse<SharedOperationsItem> = null;

  isCreatingSharedOperation = false;
  isLoading = false;
  sharedOperation: SharedOperationsItem = null;

  constructor(
    private sharedOperationsService: SharedOperationsService,
    private message: NzMessageService,
    private modal: NzModalService,
  ) {
  }

  ngOnInit(): void {
    this.loadSharedOperations();
  }

  loadSharedOperations(url?: string): void {
    this.sharedOperationsService.getAll({url}, this.customer.id).subscribe(sharedOperations => {
      this.sharedOperationsDisplayData = sharedOperations;
    });
  }

  save(sharedOperation: SharedOperationsItem): void {
    this.isLoading = true;

    if (this.sharedOperation?.id) {
      this.sharedOperationsService.update(this.sharedOperation.id, sharedOperation, this.customer.id).subscribe(
        () => this.handleSuccess(),
        () => this.handleFailure()
      );
    } else {
      this.sharedOperationsService.save(sharedOperation, this.customer.id).subscribe(
        () => this.handleSuccess(),
        () => this.handleFailure()
      );
    }
  }

  edit(sharedOperation: SharedOperationsItem): void {
    this.isCreatingSharedOperation = true;
    this.sharedOperation = sharedOperation;
  }

  delete(sharedOperation: SharedOperationsItem): void {
    this.modal.confirm({
      nzTitle: 'Deseja realmente excluir este contato?',
      nzOnOk: () => {
        this.isLoading = true;
        this.sharedOperationsService.delete(sharedOperation.id, this.customer.id).subscribe(() => {
          this.loadSharedOperations();
          this.isLoading = false;
        }, () => this.handleFailure());
      }
    });
  }

  private handleSuccess(): void {
    this.message.success('Operação salva com sucesso');
    this.isCreatingSharedOperation = false;
    this.isLoading = false;
    this.sharedOperation = null;
    this.loadSharedOperations();
  }

  private handleFailure(): void {
    this.message.error('Ocorreu um erro ao salvar a operação');
    this.isLoading = false;
  }

}
