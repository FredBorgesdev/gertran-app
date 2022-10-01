import {Component, Input, OnInit} from '@angular/core';
import { createNumberMask } from 'text-mask-addons';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BaseCrudListComponent} from '../../base-crud/base-crud-list/base-crud-list.component';
import {Router} from '@angular/router';
import {OperationRuleByPriceValue, OperationsRulesByPriceValueService} from '../operations-rules-by-price-value.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {Choice} from '../../shared/services/api.service';

@Component({
  selector: 'app-operations-rules-by-value-tab',
  templateUrl: './operations-rules-by-value-tab.component.html',
  styleUrls: ['./operations-rules-by-value-tab.component.css']
})
export class OperationsRulesByValueTabComponent extends BaseCrudListComponent<any> implements OnInit {
  @Input() operationId = null;

  isLoading = false;
  isCreatingRule = false;
  minimumRedundancyOptions: Choice[] = [];
  ruleId: string = null;
  validateForm: FormGroup;

  reaisMask = createNumberMask({
    prefix: 'R$ ',
    allowDecimal: true,
    thousandsSeparatorSymbol: '.',
    decimalSymbol: ',',
  });

  operationsRulesColumns = [
    { title: 'Valor Mínimo' },
    { title: 'Valor Máximo' },
    { title: 'Redundância Mínima' },
    { title: 'Guarda Armada' },
    { title: 'Isca' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    router: Router,
    operationRulesByValueService: OperationsRulesByPriceValueService,
    message: NzMessageService,
    modal: NzModalService,
  ) {
    super(
      'operations-rules-by-value',
      router,
      operationRulesByValueService,
      message,
      modal,
    );
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.validateForm = this.formBuilder.group({
      minimumPriceValue: [null, [Validators.required]],
      maximumPriceValue: [null, [Validators.required]],
      redundancyMinimum: [null, [Validators.required]],
      armedGuard: [false],
      rfBait: [false],
    });

    (this.service as OperationsRulesByPriceValueService).getMinimumRedundancyOptions().subscribe(options => {
      this.minimumRedundancyOptions = options;
    });
  }

  save(): void {
    if (!this.validateForm.valid) {
      return;
    }

    this.isLoading = true;
    const unmaskedMinimumPriceValue = this.validateForm.controls.minimumPriceValue.value.replace('R$ ', '').replace('.', '').replace(',', '.');
    const unmaskedMaximumPriceValue = this.validateForm.controls.maximumPriceValue.value.replace('R$ ', '').replace('.', '').replace(',', '.');
    const payload = {
      ...this.validateForm.value,
      minimumPriceValue: unmaskedMinimumPriceValue,
      maximumPriceValue: unmaskedMaximumPriceValue,
    };

    if (this.ruleId) {
      this.service.update(
        this.ruleId,
        payload,
        this.operationId,
      ).subscribe(
        () => this.handleSuccess(),
        () => this.handleError(),
      );
    } else {
      this.service.save({
        ...this.validateForm.value,
        minimumPriceValue: unmaskedMinimumPriceValue,
        maximumPriceValue: unmaskedMaximumPriceValue,
      }, this.operationId).subscribe(
        () => this.handleSuccess(),
        () => this.handleError()
      );
    }
  }

  edit(item: OperationRuleByPriceValue): void {
    const maskedMinimumPriceValue = item.minimumPriceValue.toString().replace('.', ',');
    const maskedMaximumPriceValue = item.maximumPriceValue.toString().replace('.', ',');
    this.validateForm.patchValue({
      ...item,
      minimumPriceValue: `R$ ${maskedMinimumPriceValue}`,
      maximumPriceValue: `R$ ${maskedMaximumPriceValue}`,
    });

    this.ruleId = item.id;
    this.isCreatingRule = true;
  }

  additionalParams(): any[] {
    return [this.operationId];
  }

  private handleSuccess(): void {
    this.isLoading = false;
    this.isCreatingRule = false;
    this.message.success('Regra salva com sucesso.');
    this.validateForm.reset();
    this.ruleId = null;
    this.loadResources();
  }

  private handleError(): void {
    this.isLoading = false;
    this.message.error('Erro ao salvar regra. Tente novamente.');
  }
}
