import {Component, Input, OnInit} from '@angular/core';
import {MonitoringRequests, MonitoringRequestsService} from '../monitoring-requests.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Wagon} from '../../wagons/wagons.service';
import {subscribeOn} from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';

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

  validateForm: FormGroup;

  isLoading = false;
  monitoringRequest: MonitoringRequests;
  newStatus = Status.DRAFT;
  observations = '';

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
      value: 'panelChecked',
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
  ) { }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      hasMacro: [null],
      hasEmbeddedIntelligence: [null],
      approved: [null],
      allowedTravel: [null],
      justification: [''],
      embeddedIntelligenceJustification: [''],
      status: [null],
      observations: ['']
    });
    this.checklistItems.forEach(item => {
      this.validateForm.addControl(item.value, this.formBuilder.control(false));
    });

    this.isLoading = true;
    this.monitoringRequestService.get(this.monitoringRequestId).subscribe(result => {
      this.monitoringRequest = result;
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
      this.message.error('Não foi possível carregar o pedido de monitoramento.');
    });
  }

  getWagonsPlates(): string {
    return this.monitoringRequest?.wagons.map(wagon => (wagon as Wagon).vehicle.plate).join(', ') ?? '';
  }

  save(): void {
    if (this.validateForm.invalid) {
      this.message.error('Preencha os dados corretamente.');
      return;
    }

    const {
      status,
      observations,
      ...checklist
    } = this.validateForm.value;
    const body: any = { checklist, status, observations };

    this.isLoading = true;
    this.monitoringRequestService.update(this.monitoringRequest.id, body).subscribe(() => {
      this.message.success('Status atualizado com sucesso.');
      this.isLoading = false;
    }, () => {
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
}
