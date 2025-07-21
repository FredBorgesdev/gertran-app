import { Component, Input, OnInit } from '@angular/core';
import { LoadingOrders, LoadingOrdersService } from '../loading-orders.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { BaseCrudListComponent } from '../../base-crud/base-crud-list/base-crud-list.component';
import { NzModalService } from 'ng-zorro-antd/modal';

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
  ocrNumberMask = [
    /\d/, /\d/, /\d/, /\d/, '/',
    /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-',
    /\d/, /\d/
  ];

  loadingOrdersColumns = [
    { title: 'Id' },
    { title: 'Número' },
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

  ocrNumberValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return { required: true };
    const pattern = /^\d{4}\/\d{6}-\d{1,2}$/;
    return pattern.test(value) ? null : { pattern: true };
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.validateForm = this.formBuilder.group({
      ocrNumber: [null, [Validators.required, this.ocrNumberValidator.bind(this)]],
    });
  }

  save(): void {
    const rawValue = this.validateForm.get('ocrNumber').value;
    const cleanedValue = rawValue ? rawValue.replace(/_/g, '') : null;
    this.validateForm.get('ocrNumber').setValue(cleanedValue);

    if (this.validateForm.invalid) {
      this.validateForm.markAllAsTouched();
      this.message.warning('Preencha corretamente o campo Número.');
      return;
    }

    this.isLoading = true;
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
    this.loadingOrderId = null;
    this.isLoading = false;
    this.loadResources();
  }

  private handleError(): void {
    this.isLoading = false;
    this.message.error('Erro ao salvar');
  }

  closeModal(): void {
    this.isCreating = false;
    this.loadingOrderId = null;
    this.validateForm.reset();
  }
}
