import {Component, Input, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BaseCrudListComponent} from '../../base-crud/base-crud-list/base-crud-list.component';
import {NzModalService} from 'ng-zorro-antd/modal';
import {ArmedGuard, ArmedGuardService} from '../armed-guard.service';

@Component({
  selector: 'app-armed-guard-tab',
  templateUrl: './armed-guard-tab.component.html',
  styleUrls: ['./armed-guard-tab.component.css']
})
export class ArmedGuardTabComponent extends BaseCrudListComponent<ArmedGuard> implements OnInit {
  @Input() monitoringRequestId: string;

  validateForm: FormGroup;
  isCreating = false;
  loadingOrderId: string = null;

  loadingOrdersColumns = [
    { title: 'Id' },
    { title: 'Tecnologia' },
    { title: 'Número de série' },
    { title: 'Placa' },
    { title: 'Contato' },
    { title: 'Primeiro agente' },
    { title: 'Segundo agente' },
    { title: 'Ações' },
  ];

  installationLocations = [
    { label: 'Carreta', value: 'wagon' },
    { label: 'Cavalo', value: 'truck' },
    { label: 'Carregamento', value: 'load' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    service: ArmedGuardService,
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
      technology: [null, [Validators.required]],
      serialNumber: [null, [Validators.required]],
      plate: [null, [Validators.required]],
      contact: [null, [Validators.required]],
      firstAgent: [null, [Validators.required]],
      secondAgent: [null, []],
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

  edit(item: ArmedGuard): void {
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
