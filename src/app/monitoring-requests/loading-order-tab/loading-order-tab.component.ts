import {Component, Input, OnInit} from '@angular/core';
import {LoadingOrders, LoadingOrdersService} from '../loading-orders.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BaseCrudListComponent} from '../../base-crud/base-crud-list/base-crud-list.component';
import {NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-loading-order-tab',
  templateUrl: './loading-order-tab.component.html',
  styleUrls: ['./loading-order-tab.component.css']
})
export class LoadingOrderTabComponent extends BaseCrudListComponent<LoadingOrders> implements OnInit {
  @Input() monitoringRequestId: string;

  validateForm: FormGroup;
  isCreating = false;
  loadingOrderId: string = null;

  loadingOrdersColumns = [
    { title: 'Id' },
    { title: 'Nome' },
    { title: 'Ações' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    service: LoadingOrdersService,
    message: NzMessageService,
    activatedRoute: ActivatedRoute,
    router: Router,
    modal: NzModalService,
  ) {
    super(
      'loading-orders',
      router,
      service,
      message,
      modal,
    );
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.validateForm = this.formBuilder.group({
      ocrNumber: [null, [Validators.required]],
    });
  }

  save(): void {
    if (this.loadingOrderId) {
      this.service.update(this.loadingOrderId, this.validateForm.value, this.monitoringRequestId).subscribe(
        () => this.handleSuccess(),
        () => this.handleError(),
      );
    } else {
      this.service.save(this.validateForm.value, this.monitoringRequestId).subscribe(
        () => this.handleSuccess(),
        () => this.handleError()
      );
    }
  }

  edit(item: LoadingOrders): void {
    this.validateForm.patchValue(item);
    this.loadingOrderId = item.id;
    this.isCreating = true;
  }

  additionalParams(): any[] {
    return [this.monitoringRequestId];
  }

  private handleSuccess(): void {
    this.message.success('Salvo com sucesso');
    this.validateForm.reset();
    this.isCreating = false;
    this.loadResources();
  }

  private handleError(): void {
    this.message.error('Erro ao salvar');
  }
}
