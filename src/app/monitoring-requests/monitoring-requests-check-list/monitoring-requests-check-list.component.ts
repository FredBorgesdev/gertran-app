import {Component, Input, OnInit} from '@angular/core';
import {MonitoringRequestsService} from '../monitoring-requests.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Terminals, TerminalsService} from '../../terminals/terminals.service';
import {UtilsService} from '../../shared/services/utils.service';
import {NzModalRef} from 'ng-zorro-antd/modal';
import MonitoringRequest from '../monitoring-request';
import {ChecklistsService} from '../../checklists/checklists.service';

export type ModalDestroyResult = {
  updateList: boolean;
};

@Component({
  selector: 'app-monitoring-requests-check-list',
  templateUrl: './monitoring-requests-check-list.component.html',
  styleUrls: ['./monitoring-requests-check-list.component.css']
})
export class MonitoringRequestsCheckListComponent implements OnInit {
  @Input() monitoringRequestId: string;
  @Input() readOnly = false;
  @Input() showFooter = false;

  checklistForm: FormGroup;
  checklistBaitForm: FormGroup;
  validateForm: FormGroup;

  isLoading = false;
  observations = '';
  terminals: Terminals[] = [];

  monitoringRequest: MonitoringRequest;

  printConfig = {
    printMode: 'template-popup',
    popupProperties: 'toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,fullscreen=yes',
    pageTitle: '',
    styles: [
      'td { padding: 5px !important; }',
      // Styles copied from antd implementation
      '.ant-checkbox-inner::after { position: absolute !important; display: table !important; border: 2px solid #3f87f5 !important; border-top: 0 !important; border-left: 0 !important; transform: rotate(45deg) scale(1) translate(-50%,-50%) !important; opacity: 1 !important; transition: all .2s cubic-bezier(.12,.4,.29,1.46) .1s !important; content: \' \' !important; }',
      '* { font-size: 10px; }',
    ],
  };

  possibleStatus = [];

  constructor(
    private monitoringRequestService: MonitoringRequestsService,
    private message: NzMessageService,
    private formBuilder: FormBuilder,
    private terminalsService: TerminalsService,
    private utils: UtilsService,
    private modal: NzModalRef,
    public checklistService: ChecklistsService,
  ) {
  }

  ngOnInit(): void {
    this.checklistForm = this.formBuilder.group({
      hasMacro: [false, []],
      hasEmbeddedIntelligence: [false, []],
      status: ['requested', []],
      allowedTravel: [null, []],
      justification: [{value: '', disabled: this.readOnly}, []],
      embeddedIntelligenceJustification: ['', []],
    });
    this.checklistService.localizedValues.forEach(item => {
      this.checklistForm.addControl(item.value, this.formBuilder.control(false, []));
    });
    this.checklistForm.get('status').valueChanges.subscribe(value => {
      if (value === 'reproved') {
        this.checklistForm.get('justification').setValidators([Validators.required]);
        this.checklistForm.get('justification').updateValueAndValidity();
      }
    });

    this.validateForm = this.formBuilder.group({
      terminal: [null, []],
      status: [null, []],
      observations: ['', []]
    });

    this.checklistBaitForm = this.formBuilder.group({
      positionChecked: [false, []],
      batteriesChecked: [false, []],
      relationChecked: [false, []],
      jammingChecked: [false, []],
      decouplingChecked: [false, []],
      timerChecked: [false, []],
      positionFrequencyChecked: [false, []],
      batteryLevel: [null, []],
      timerIntervalInMinutes: [null, []],
      approved: [null, []],
      justification: [{value: '', disabled: this.readOnly}, []]
    });

    this.loadMonitoringRequest();
    this.loadTerminals();
  }

  loadMonitoringRequest(): void {
    this.isLoading = true;
    this.monitoringRequestService.get(this.monitoringRequestId).subscribe(result => {
      this.monitoringRequest = new MonitoringRequest(result);
      this.setPossibleStatus();
      this.isLoading = false;

      if (result.checklist) {
        this.checklistForm.patchValue(result.checklist);
      }
      if (result.checklistBait) {
        this.checklistBaitForm.patchValue(result.checklistBait);
      }

      this.validateForm.patchValue({
        status: result.status,
        observations: result.observations,
        terminal: result.terminal?.id
      });

      this.printConfig.pageTitle = `Checklist de Monitoramento - ${this.monitoringRequest?.data.customer?.tradingName}`;
    }, () => {
      this.isLoading = false;
      this.message.error('Não foi possível carregar o pedido de monitoramento.');
    });
  }

  loadTerminals(): void {
    this.terminalsService.getAll({limit: 999}).subscribe(result => {
      this.terminals = result.results;
    });
  }

  save(status: string): Promise<void> {
    const hasInvalidForm = this.checklistForm.invalid || this.checklistBaitForm.invalid || this.validateForm.invalid;
    if (hasInvalidForm) {
      this.message.error('Preencha os dados corretamente.');
      return;
    }

    const body = {
      ...this.validateForm.value,
      checklist: this.utils.removeNullValues(this.checklistForm.value),
      checklistBait: this.utils.removeNullValues(this.checklistBaitForm.value),
      status,
    };

    this.isLoading = true;
    return this.monitoringRequestService.release(this.monitoringRequest.data.id, body).toPromise().then(() => {
      this.message.success('Status atualizado com sucesso.');
      this.isLoading = false;
      this.modal.destroy({updateList: true});
    }).catch(() => {
      this.message.error('Não foi possível atualizar o status.');
      this.isLoading = false;
    });
  }

  private setPossibleStatus(): void {
    this.possibleStatus = this.monitoringRequestService.possibleStatus[
      this.monitoringRequest?.data?.status
      ] || [];
  }
}
