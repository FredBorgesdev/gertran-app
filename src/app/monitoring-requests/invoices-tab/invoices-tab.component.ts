import {Component, Input, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BaseCrudListComponent} from '../../base-crud/base-crud-list/base-crud-list.component';
import {NzModalService} from 'ng-zorro-antd/modal';
import {Invoice, InvoicesService} from '../invoices.service';
import {createNumberMask} from "text-mask-addons";
import {UtilsService} from "../../shared/services/utils.service";

@Component({
  selector: 'app-invoices-tab',
  templateUrl: './invoices-tab.component.html',
  styleUrls: ['./invoices-tab.component.css']
})
export class InvoicesTabComponent extends BaseCrudListComponent<Invoice> implements OnInit {
  @Input() monitoringRequestId: string;

  validateForm: FormGroup;
  isCreating = false;
  invoiceId: string = null;

  loadingOrdersColumns = [
    {title: 'Id'},
    {title: 'Nome'},
    {title: 'CTE'},
    {title: 'Valor'},
    {title: 'Ações'},
  ];

  reaisMask = createNumberMask({
    prefix: 'R$ ',
    allowDecimal: true,
    thousandsSeparatorSymbol: '.',
    decimalSymbol: ',',
  });

  constructor(
    private formBuilder: FormBuilder,
    private utilsService: UtilsService,
    service: InvoicesService,
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
      invoiceNumber: [null, [Validators.required]],
      invoiceCte: [null, []],
      value: [null, []],
    });
  }

  save(): void {
    this.isLoading = true;
    const body = this.utilsService.removeNullValues({
      ...this.validateForm.value,
      value: this.validateForm.value.value && Number(
        this.validateForm.value.value.replace('R$ ', '').replace(/\./g, '').replace(',', '.')
      ),
    });

    if (this.invoiceId) {
      this.service.update(this.invoiceId, body, this.monitoringRequestId).subscribe(
        () => this.handleSuccess(),
        () => this.handleError(),
      );
    } else {
      this.service.save(body, this.monitoringRequestId).subscribe(
        () => this.handleSuccess(),
        () => this.handleError()
      );
    }
  }

  edit(item: Invoice): void {
    this.validateForm.patchValue({
      ...item,
      value: Number(item.value)
    });
    this.invoiceId = item.id;
    this.isCreating = true;
  }

  additionalParams(): any[] {
    return [this.monitoringRequestId];
  }

  private handleSuccess(): void {
    this.message.success('Salvo com sucesso');
    this.validateForm.reset();
    this.isCreating = false;
    this.invoiceId = null;
    this.isLoading = false;
    this.loadResources();
  }

  private handleError(): void {
    this.message.error('Erro ao salvar');
    this.isLoading = false;
  }

  closeModal(): void {
    this.isCreating = false;
    this.validateForm.reset();
    this.invoiceId = null;
  }
}
