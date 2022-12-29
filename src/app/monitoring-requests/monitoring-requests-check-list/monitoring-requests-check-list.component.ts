import {Component, Input, OnInit} from '@angular/core';
import {MonitoringRequests, MonitoringRequestsService} from '../monitoring-requests.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Wagon} from '../../wagons/wagons.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TravelStep} from '../travel-step.service';
import {Terminals, TerminalsService} from '../../terminals/terminals.service';
import {UtilsService} from '../../shared/services/utils.service';

enum Status {
  DRAFT = 'draft',
  UNDER_REVIEW = 'under_review',
  WAITING_FOR_START = 'waiting_for_start',
  IN_PROGRESS = 'in_progress',
  REPROVED = 'reproved',
  FINISHED = 'finished',
  SUCCESSFULLY_TERMINATED = 'successfully_terminated',
  CANCELED = 'canceled',
  UNSUCCESSFULLY_TERMINATED = 'unsuccessfully_terminated',
  TERMINATED_DISAPPROVED = 'terminated_disapproved',
  POTENTIALLY_STOLEN = 'potentially_stolen',
  STOLEN_CONFIRMED = 'stolen_confirmed',
  PENDING = 'pending',
  IMPORTED_UNAVAILABLE = 'imported_unavailable',
}

@Component({
  selector: 'app-monitoring-requests-check-list',
  templateUrl: './monitoring-requests-check-list.component.html',
  styleUrls: ['./monitoring-requests-check-list.component.css']
})
export class MonitoringRequestsCheckListComponent implements OnInit {
  @Input() monitoringRequestId: string;
  @Input() readOnly = false;

  checklistForm: FormGroup;
  checklistBaitForm: FormGroup;
  validateForm: FormGroup;

  isLoading = false;
  monitoringRequest: MonitoringRequests;
  observations = '';
  terminals: Terminals[] = [];

  checklistItems = [
    {
      label: 'Sensor Porta Motorista',
      value: 'driverDoorChecked',
    },
    {
      label: 'Sensor Porta Passageiro',
      value: 'passengerDoorChecked',
    },
    {
      label: 'Sensor de engate de carreta',
      value: 'wagonEngagedChecked',
    },
    {
      label: 'Sensor de Painel',
      value: 'panelSensorChecked',
    },
    {
      label: 'Sensor de Bau',
      value: 'trunkChecked',
    },
    {
      label: 'Sirene',
      value: 'sirenChecked',
    },
    {
      label: 'Bloqueio',
      value: 'blockChecked',
    },
    {
      label: 'Trava de Bau',
      value: 'trunkLockChecked',
    }
  ];

  possibleStatus = [];

  constructor(
    private monitoringRequestService: MonitoringRequestsService,
    private message: NzMessageService,
    private formBuilder: FormBuilder,
    private terminalsService: TerminalsService,
    private utils: UtilsService,
  ) { }

  ngOnInit(): void {
    this.checklistForm = this.formBuilder.group({
      hasMacro: [false, []],
      hasEmbeddedIntelligence: [false, []],
      status: ['requested', []],
      allowedTravel: [null, []],
      justification: ['', []],
      embeddedIntelligenceJustification: ['', []],
    });
    this.checklistItems.forEach(item => {
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
      justification: ['', []]
    });

    this.loadMonitoringRequest();
    this.loadTerminals();
  }

  loadMonitoringRequest(): void {
    this.isLoading = true;
    this.monitoringRequestService.get(this.monitoringRequestId).subscribe(result => {
      this.monitoringRequest = result;
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
    }, () => {
      this.isLoading = false;
      this.message.error('Não foi possível carregar o pedido de monitoramento.');
    });
  }

  loadTerminals(): void {
    this.terminalsService.getAll({ limit: 999 }).subscribe(result => {
      this.terminals = result.results;
    });
  }

  getWagonsPlates(): string {
    return this.monitoringRequest?.wagons.map(wagon => (wagon as Wagon).vehicle.plate).join(', ') ?? '';
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
    return this.monitoringRequestService.release(this.monitoringRequest.id, body).toPromise().then(() => {
      this.message.success('Status atualizado com sucesso.');
      this.isLoading = false;
    }).catch(() => {
      this.message.error('Não foi possível atualizar o status.');
      this.isLoading = false;
    });
  }

  getWorkingSituation(workingSituation: string): string {
    return {
      fleet: 'Frota',
      aggregate: 'Agregado',
      thirdParty: 'Terceirizado',
    }[workingSituation] || 'N/a';
  }

  getLoadType(): string {
    return {
      refrigerated: 'Refrigerada',
      unrefrigerated: 'Não refrigerada',
      frozen: 'Congelada',
    }[this.monitoringRequest?.loadType] || 'N/a';
  }

  get firstTravelStep(): TravelStep {
    return this.monitoringRequest?.travelSteps?.[0];
  }

  get firstTravelStepDate(): Date {
    if (!this.firstTravelStep) {
      return new Date();
    }
    return new Date(this.firstTravelStep?.date + ' ' + this.firstTravelStep?.time);
  }

  get lastTravelStep(): TravelStep {
    return this.monitoringRequest?.travelSteps?.[this.monitoringRequest.travelSteps.length - 1];
  }

  get lastTravelStepDate(): Date {
    if (!this.lastTravelStep) {
      return new Date();
    }
    return new Date(this.lastTravelStep?.date + ' ' + this.lastTravelStep?.time);
  }

  private setPossibleStatus(): void {
    this.possibleStatus = {
      [Status.DRAFT]: [
        { label: 'Em análise', value: Status.UNDER_REVIEW },
      ],
      [Status.UNDER_REVIEW]: [
        { label: 'Salvar', value: Status.WAITING_FOR_START },
        { label: 'Reprovado', value: Status.CANCELED },
        { label: 'Finalizar viagem', value: Status.FINISHED },
      ],
      [Status.WAITING_FOR_START]: [
        { label: 'Iniciar viagem', value: Status.IN_PROGRESS },
        { label: 'Finalizar viagem', value: Status.FINISHED },
      ],
      [Status.IN_PROGRESS]: [
        { label: 'Finalizar viagem', value: Status.FINISHED },
      ],
    }[this.monitoringRequest?.status] || [];
  }
}
