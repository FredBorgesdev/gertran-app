import {Component, Input, OnInit} from '@angular/core';
import {MonitoringRequestsService, Status} from '../monitoring-requests.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Terminals, TerminalsService} from '../../terminals/terminals.service';
import {UtilsService} from '../../shared/services/utils.service';
import {NzModalRef} from 'ng-zorro-antd/modal';
import MonitoringRequest from '../monitoring-request';
import {ChecklistsService} from '../../checklists/checklists.service';
import {AuthenticationService} from "../../authentication/authentication.service";
import { ReportsService,BasePeriodFilter  } from 'src/app/reports/reports.service';

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


  lastReleasedMonitoringRequests = []

  printConfig = {
    printMode: 'template-popup',
    popupProperties: 'toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,fullscreen=yes',
    pageTitle: '',
    styles: [
      'td { padding: 5px !important; }',
      // Styles copied from antd implementation
      '.ant-checkbox-inner::after { position: absolute !important; display: table !important; border: 2px solid #3f87f5 !important; border-top: 0 !important; border-left: 0 !important; transform: rotate(45deg) scale(1) translate(-50%,-50%) !important; opacity: 1 !important; transition: all .2s cubic-bezier(.12,.4,.29,1.46) .1s !important; content: \' \' !important; }',
      '.metadata-text { font-size: 20px; margin-bottom: 10px }',
      '* { font-size: 10px; }',
    ],
  };

  possibleStatus = [];

  checklistItems = [];

  constructor(
    private monitoringRequestService: MonitoringRequestsService,
    private message: NzMessageService,
    private formBuilder: FormBuilder,
    private terminalsService: TerminalsService,
    private utils: UtilsService,
    private modal: NzModalRef,
    public checklistService: ChecklistsService,
    public authSevice: AuthenticationService,
    public reportsService: ReportsService
  ) {
  }

  ngOnInit(): void {
    this.checklistItems = this.checklistService.localizedValues;

    this.loadChecklistForm();
    this.loadMonitoringRequestForm();
    this.loadChecklistBaitForm();
    this.loadMonitoringRequest();
    this.loadTerminals();
  }

  loadChecklistForm(): void {
    this.checklistForm = this.formBuilder.group({
      hasMacro: [false, []],
      hasEmbeddedIntelligence: [false, []],
      status: ['requested', []],
      allowedTravel: [null, []],
      justification: ['', []],
      embeddedIntelligenceJustification: ['', []],
      driverDoorChecked: [false, []],
      passengerDoorChecked: [false, []],
      wagonEngagedChecked: [false, []],
      panelSensorChecked: [false, []],
      trunkChecked: [false, []],
      sirenChecked: [false, []],
      blockChecked: [false, []],
      trunkLockChecked: [false, []],
    });
    this.checklistForm.get('status').valueChanges.subscribe(value => {
      if (value === 'reproved') {
        this.checklistForm.get('justification').setValidators([Validators.required]);
        this.checklistForm.get('justification').updateValueAndValidity();
      }
    });
    if (this.readOnly) {
      this.checklistForm.disable();
    }
  }

  loadMonitoringRequestForm(): void {
    this.validateForm = this.formBuilder.group({
      terminal: [null, []],
      status: [null, []],
      observations: ['', []]
    });
  }

  loadChecklistBaitForm(): void {
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
      justification: ['', []]
    });
    if (this.readOnly) {
      this.checklistForm.disable();
    }
  }

  returnRange3Days() {
    const currentDate = new Date();
    const sevenDaysAgo = new Date(currentDate);
    sevenDaysAgo.setDate(currentDate.getDate() - 3);
    const fromDate = this.formatDate(sevenDaysAgo);
    const toDate = this.formatDate(currentDate);
    return { fromDate, toDate };
  }
  
  formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  loadMonitoringRequest(): void {
    this.isLoading = true;
    this.monitoringRequestService.get(this.monitoringRequestId).subscribe(result => {
      const {fromDate,toDate} = this.returnRange3Days()

      const periodFielter: BasePeriodFilter = {
        from:fromDate,
        to:toDate,
        customer:result.customer.id
      }

      this.reportsService.getVehiclesReleased(periodFielter)
      .toPromise().then(releasedMonitoringRequests=>{
        this.lastReleasedMonitoringRequests = releasedMonitoringRequests
        .filter(x=>x.truck.id==result.truck.id && x.id != this.monitoringRequestId)
      })

      this.monitoringRequest = new MonitoringRequest(result);
      this.setPossibleStatus();
      this.isLoading = false;
      this.patchFormsValues();
      this.printConfig.pageTitle = `Checklist de Monitoramento - ${this.monitoringRequest?.data.customer?.tradingName}`;
    }, () => {
      this.isLoading = false;
      this.message.error('Não foi possível carregar o pedido de monitoramento.');
    });
  }

  patchFormsValues(): void {
    if (this.monitoringRequest.data.checklist) {
      this.checklistForm.patchValue(this.monitoringRequest.data.checklist);
    }
    if (this.monitoringRequest.data.checklistBait) {
      this.checklistBaitForm.patchValue(this.monitoringRequest.data.checklistBait);
    }

    this.validateForm.patchValue({
      status: this.monitoringRequest.data.status,
      observations: this.monitoringRequest.data.observations,
      terminal: this.monitoringRequest.data.terminal?.id
    });
  }

  loadTerminals(): void {
    this.terminalsService.getAll({limit: 999}).subscribe(result => {
      this.terminals = result.results;
    });
  }


  checkRealease(body): boolean{
    if(body.terminal == undefined) {
      alert('Terminal não foi selecionado!')
      return true
    }


    if(!body.checklist.allowedTravel){
      const releaseTravelIfConfirmed = confirm("Veículo com viagem não autorizada, tem certeza em continuar liberação para viagem? ");
      if(!releaseTravelIfConfirmed){
        return true
      }
    }

    if(body.checklist.status == 'reproved'){
      const releaseTravelIfConfirmed = confirm("Veículo com status de checklist reprovado, tem certeza em continuar liberação para viagem?");
      if(!releaseTravelIfConfirmed){
        return true
      }
    }
  }

  save(status: string): Promise<void> {
    const hasInvalidForm = this.checklistForm.invalid ||
      this.checklistBaitForm.invalid ||
      this.validateForm.invalid;
    if (hasInvalidForm) {
      this.message.error('Preencha os dados corretamente.');
      return;
    }

    let body = {
      ...this.validateForm.value,
      checklist: this.utils.removeNullValues(this.checklistForm.value),
      checklistBait: this.utils.removeNullValues(this.checklistBaitForm.value),
      status,
      user: this.authSevice.user.id
    };



    if(status == Status.WAITING_FOR_START){
      if(this.checkRealease(body)) return

    }

    if (
      status === Status.IN_PROGRESS &&
      this.monitoringRequest.data.travelStatus === 'none'
    ) {

      if(this.checkRealease(body)) return

      body.travelStatus = 'in_progress';
    }

    let message;
    if (status === Status.CANCELED) {
      message = 'Informe o motivo do cancelamento';
    }

    if (status === Status.FINISHED) {
      message = 'Informe o motivo da finalização';
    }

    if (message) {
      const observations = prompt(message);
      if (!observations) {
        this.message.error('Preencha os dados corretamente.');
        return;
      }

      body.observations = observations;
    }

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
    if (!this.authSevice.user.isGertranStaff) {
      if (this.monitoringRequest?.data?.status === Status.REPROVED) {
        this.possibleStatus = this.monitoringRequestService.possibleStatus[
          this.monitoringRequest?.data?.status
          ];
      }

      return;
    }

    this.possibleStatus = this.monitoringRequestService.possibleStatus[
      this.monitoringRequest?.data?.status
      ] || [];
  }
}
