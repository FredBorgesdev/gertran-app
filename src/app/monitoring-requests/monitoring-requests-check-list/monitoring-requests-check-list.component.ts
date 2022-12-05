import {Component, Input, OnInit} from '@angular/core';
import {MonitoringRequests, MonitoringRequestsService} from '../monitoring-requests.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Wagon} from '../../wagons/wagons.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TravelStep} from '../travel-step.service';
import {Terminals, TerminalsService} from '../../terminals/terminals.service';

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

  constructor(
    private monitoringRequestService: MonitoringRequestsService,
    private message: NzMessageService,
    private formBuilder: FormBuilder,
    private terminalsService: TerminalsService,
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

  save(): Promise<void> {
    const hasInvalidForm = this.checklistForm.invalid || this.checklistBaitForm.invalid || this.validateForm.invalid;
    if (hasInvalidForm) {
      this.message.error('Preencha os dados corretamente.');
      return;
    }

    const body = {
      checklist: this.checklistForm.value,
      checklistBait: this.checklistBaitForm.value,
      ...this.validateForm.value,
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

  get statusList(): { label: string, value: string }[] {
    return [
      {
        label: 'Rascunho',
        value: Status.DRAFT,
      },
      {
        label: 'Em análise',
        value: Status.UNDER_REVIEW,
      },
      {
        label: 'Aguardando início',
        value: Status.WAITING_FOR_START,
      },
      {
        label: 'Em andamento',
        value: Status.IN_PROGRESS,
      },
      {
        label: 'Reprovado',
        value: Status.REPROVED,
      },
      {
        label: 'Finalizado',
        value: Status.FINISHED,
      },
      {
        label: 'Finalizado com sucesso',
        value: Status.SUCCESSFULLY_TERMINATED,
      },
      {
        label: 'Cancelado',
        value: Status.CANCELED,
      },
      {
        label: 'Finalizado sem sucesso',
        value: Status.UNSUCCESSFULLY_TERMINATED,
      },
      {
        label: 'Finalizado com desaprovação',
        value: Status.TERMINATED_DISAPPROVED,
      },
      {
        label: 'Potencialmente roubado',
        value: Status.POTENTIALLY_STOLEN,
      },
      {
        label: 'Roubado confirmado',
        value: Status.STOLEN_CONFIRMED,
      },
      {
        label: 'Pendente',
        value: Status.PENDING,
      },
      {
        label: 'Importado indisponível',
        value: Status.IMPORTED_UNAVAILABLE,
      }
    ];
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
}
