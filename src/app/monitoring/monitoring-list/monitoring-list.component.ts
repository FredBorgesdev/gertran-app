import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Monitoring, MonitoringService} from '../monitoring.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {MonitoringMapComponent} from '../monitoring-map/monitoring-map.component';
import {Customer, CustomersService} from '../../customers/customers.service';
import {Terminals, TerminalsService} from '../../terminals/terminals.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Position, PositionsService} from '../positions.service';
import {Observable, Subject, timer} from 'rxjs';
import {share, switchMap, takeUntil} from 'rxjs/operators';
import {GetAllResponse} from '../../shared/services/api.service';
import {MonitoringAlertModalComponent} from '../monitoring-alert-modal/monitoring-alert-modal.component';
import {MonitoringEventModalComponent} from '../monitoring-event-modal/monitoring-event-modal.component';

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
  selector: 'app-monitoring-list',
  templateUrl: './monitoring-list.component.html',
  styleUrls: ['./monitoring-list.component.css']
})
export class MonitoringListComponent implements OnInit, OnDestroy {
  isLoading = false;
  monitoringColumns = [
    { title: 'Tec', nzLeft: true, style: 'z-index: 999' },
    { title: 'Rastreador', nzLeft: true, style: 'z-index: 999' },
    { title: 'Viagem', nzLeft: true, style: 'z-index: 999' },
    { title: 'Placa', nzLeft: true, style: 'z-index: 999' },
    { title: 'Ignição' },
    { title: 'Alerta' },
    { title: 'Automação' },
    { title: 'Mapa' },
    { title: 'Progresso' },
    { title: 'Velocidade' },
    { title: 'Cliente' },
    { title: 'Data e Hora' },
    { title: 'Posição' },
    { title: 'Origem' },
    { title: 'Destino' },
    { title: 'Alertas' },
    { title: 'Status V.' },
    { title: 'Obs.' },
    { title: 'Motorista' },
    { title: 'Carreta' },
    { title: 'Comunicação' },
    { title: 'Macro' },
    { title: 'Int. Emb.' },
    { title: 'Isca' },
    { title: 'Temp.' },
    { title: '' },
  ];
  filter = 'all';
  validateForm: FormGroup;

  stopMonitoring = new Subject();
  monitoringData$: Observable<GetAllResponse<Position>>;
  monitoringData: Position[] = [];

  customers: Customer[] = [];
  terminals: Terminals[] = [];

  isTableFullscreen = false;
  notFound = false;

  automations = [
    { icon: 'check-circle', color: 'orane', text: 'Excesso de velocidade' },
    { icon: 'eye', color: 'red', text: 'Desvio de rota' },
    { icon: 'credit-card', color: 'blue', text: 'Parada prolongada' },
    { icon: 'car', color: 'blue', text: 'Parada abastecimento' },
  ];
  alerts = [
    { icon: 'check-circle', color: 'green', text: 'Em viagem' },
    { icon: 'close-circle', color: 'red', text: 'Atraso em informar inicio de viagem' },
    { icon: 'info-circle', color: 'blue', text: 'Porta carona' },
    { icon: 'mail', color: 'blue', text: 'Parada abastecimento' },
  ];

  constructor(
    private router: Router,
    private service: MonitoringService,
    private message: NzMessageService,
    private modal: NzModalService,
    private customerService: CustomersService,
    private terminalsService: TerminalsService,
    private formBuilder: FormBuilder,
    private positionsService: PositionsService,
  ) { }

  ngOnInit(): void {
    this.customerService.getAll({ limit: 999 }).subscribe(data => {
      this.customers = data.results;
    });
    this.terminalsService.getAll({ limit: 999 }).subscribe(data => {
      this.terminals = data.results;
    });

    this.monitoringData$ = timer(0, 10000).pipe(
      switchMap(() => this.positionsService.getAll(
        { limit: 999 },
        {
          customer: this.validateForm.get('customer').value,
          terminal: this.validateForm.get('terminal').value,
        })
      ),
      share(),
      takeUntil(this.stopMonitoring)
    );

    this.validateForm = this.formBuilder.group({
      customer: [null],
      terminal: [null],
      groupBy: [null],
    });
  }

  ngOnDestroy(): void {
    this.stopMonitoring.next();
  }

  getRowBackgroundColor(status: string): string {
    return {
      [Status.IN_PROGRESS]: 'bg-success',
      [Status.WAITING_FOR_START]: 'bg-warning',
      [Status.FINISHED]: 'bg-success',
      [Status.CANCELED]: 'bg-danger',
      [Status.UNSUCCESSFULLY_TERMINATED]: 'bg-danger',
      [Status.TERMINATED_DISAPPROVED]: 'bg-danger',
    }[status];
  }

  openMap(item: Position): void {
    this.modal.create({
      nzTitle: 'Mapa',
      nzContent: MonitoringMapComponent,
      nzWidth: '900px',
      nzComponentParams: {
        item
      }
    });
  }

  getOrigin(item: Position): string {
    if (item.monitoringRequest.originCity) {
      return item.monitoringRequest.originCity + ', ' + item.monitoringRequest.originState;
    }

    return item.origin;
  }

  getDestiny(item: Position): string {
    if (item.monitoringRequest.destinyCity) {
      return item.monitoringRequest.destinyCity + ', ' + item.monitoringRequest.destinyState;
    }

    return item.destiny;
  }

  getAlerts(item: Position): string {
    return item.events.map(
      event => event.eventDescription
    ).join(', ');
  }

  getWagons(item: Position): string {
    return item.wagons.join(', ');
  }

  loadList(): void {
    this.isLoading = true;
    this.stopMonitoring.next();

    this.monitoringData$.subscribe(data => {
      this.monitoringData = data.results.map(item => ({
        ...item,
        alert: this.getRandomAlert(),
        automation: this.getRandomAutomation(),
      }));
      this.isLoading = false;
      this.notFound = this.monitoringData.length === 0;
    }, () => {
      this.isLoading = false;
      this.notFound = true;
      this.message.error('Erro ao carregar lista');
    });
  }

  openAlertModal(urgent = false): void {
    this.modal.create({
      nzTitle: 'Alertas',
      nzContent: MonitoringAlertModalComponent,
      nzComponentParams: {
        urgent,
      },
      nzOkText: 'Fechar',
      nzCancelText: null,
      nzWidth: '70%',
    });
  }

  getRandomAlert(): any {
    return this.alerts[Math.floor(Math.random() * this.alerts.length)];
  }

  getRandomAutomation(): any {
    return this.automations[Math.floor(Math.random() * this.automations.length)];
  }

  openAutomationModal(automation: any): void {
    this.modal.create({
      nzTitle: automation.text,
      // nzContent: 'Automação foi disparada no dia 01/01/2020 às 10:00',
      nzContent: MonitoringEventModalComponent,
      nzComponentParams: {
        name: automation.text,
      },
      nzOkText: 'Fechar',
      nzCancelText: null,
    });
  }

  getStatusTranslation(status: string): string {
    return {
      [Status.IN_PROGRESS]: 'Em viagem',
      [Status.WAITING_FOR_START]: 'Aguardando início',
      [Status.FINISHED]: 'Finalizada',
      [Status.CANCELED]: 'Cancelada',
      [Status.UNSUCCESSFULLY_TERMINATED]: 'Finalizada sem sucesso',
      [Status.TERMINATED_DISAPPROVED]: 'Finalizada sem aprovação',
    }[status];
  }
}
