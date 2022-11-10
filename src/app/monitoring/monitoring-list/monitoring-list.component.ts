import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MonitoringService} from '../monitoring.service';
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
import {UpdateObservationsModalComponent} from '../update-observations-modal/update-observations-modal.component';
import { prop } from 'ramda'
import {NzContextMenuService, NzDropdownMenuComponent} from 'ng-zorro-antd/dropdown';
import {CommandsModalComponent} from '../commands-modal/commands-modal.component';
import {MonitoringRequestsService} from '../../monitoring-requests/monitoring-requests.service';

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
  ];
  validateForm: FormGroup;

  stopMonitoring = new Subject();
  monitoringData$: Observable<GetAllResponse<Position>>;
  monitoringData: Position[] = null;

  customers: Customer[] = [];
  terminals: Terminals[] = [];

  isTableFullscreen = false;
  selectedTravelStatus: string;

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
  travelStatus = [
    { title: 'Parado', value: 'stopped', backgroundColorClass: 'bg-info' },
    { title: 'Em viagem', value: 'in_progress', backgroundColorClass: 'bg-success' },
    { title: 'Ag. Início', value: 'waiting_for_start', backgroundColorClass: 'bg-alert' },
    { title: 'Cliente', value: 'vehicle_in_customer', backgroundColorClass: 'bg-warning' },
    { title: 'Pernoite', value: 'driver_in_overnight', backgroundColorClass: 'bg-alert' },
    { title: 'Nenhum', value: 'none', backgroundColorClass: 'bg-gray-lightest' },
    { title: 'Gerenciamento logistico', value: 'logistic_management', backgroundColorClass: 'bg-gray-lightest' },
    { title: 'Prioridade', value: 'priority', backgroundColorClass: 'bg-gray-lightest' },
    { title: 'Contigência', value: 'contigency', backgroundColorClass: 'bg-danger' },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: MonitoringService,
    private message: NzMessageService,
    private modal: NzModalService,
    private customerService: CustomersService,
    private terminalsService: TerminalsService,
    private formBuilder: FormBuilder,
    private positionsService: PositionsService,
    private nzContextMenuService: NzContextMenuService,
    private monitoringRequestService: MonitoringRequestsService,
  ) { }

  ngOnInit(): void {
    this.loadFiltersList();

    this.monitoringData$ = timer(0, 100000).pipe(
      switchMap(() => this.positionsService.getAll(
        { limit: 999 },
        {
          customer: this.validateForm.get('customer').value,
          terminal: this.validateForm.get('terminal').value,
          travelStatus: this.selectedTravelStatus,
        })
      ),
      share(),
      takeUntil(this.stopMonitoring)
    );

    this.validateForm = this.formBuilder.group({
      customer: [this.activatedRoute.snapshot.queryParams.customer],
      terminal: [this.activatedRoute.snapshot.queryParams.terminal],
      groupBy: [null],
    });

    if (
      this.activatedRoute.snapshot.queryParams.terminal ||
      this.activatedRoute.snapshot.queryParams.customer
    ) {
      this.subscribeToMonitoringData();
    }
  }

  loadFiltersList(): void {
    this.customerService.getAll({ limit: 999 }).subscribe(data => {
      this.customers = data.results;
    });
    this.terminalsService.getAll({ limit: 999 }).subscribe(data => {
      this.terminals = data.results;
    });
  }

  ngOnDestroy(): void {
    this.stopMonitoring.next();
  }

  getRowBackgroundColor(status: string): string {
    return this.travelStatus.find(item => item.value === status).backgroundColorClass;
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
    return item.events.map(prop('eventDescription')).join(', ');
  }

  getWagons(item: Position): string {
    return item.wagons.join(', ');
  }

  loadPositions(): void {
    this.router.navigate([], {
      queryParams: {
        customer: this.validateForm.get('customer').value,
        terminal: this.validateForm.get('terminal').value,
        'navbar-closed': true,
      }
    });

    this.subscribeToMonitoringData();
  }

  subscribeToMonitoringData(): void {
    this.isLoading = true;
    this.stopMonitoring.next();

    this.monitoringData$.subscribe(data => {
      this.monitoringData = data.results.map(item => ({
        ...item,
        alert: this.getRandomAlert(),
      }));
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
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

  openAutomationModal(automations: Position['automations']): void {
    if (automations.length === 0) {
      return;
    }

    this.modal.create({
      nzTitle: 'Automação',
      // nzContent: 'Automação foi disparada no dia 01/01/2020 às 10:00',
      nzContent: MonitoringEventModalComponent,
      nzComponentParams: {
        automations,
      },
      nzOkText: 'Fechar',
      nzCancelText: null,
    });
  }

  getStatusTranslation(status: string): string {
    return this.travelStatus.find(item => item.value === status).title;
  }

  goToMonitoringRequest(id: string): void {
    this.router.navigate(['monitoring-requests', 'monitoring-requests-edit', id]);
  }

  openUpdateObservationModal(item: Position): void {
    this.modal.create({
      nzTitle: item.customer.name,
      nzContent: UpdateObservationsModalComponent,
      nzOnOk: (componentInstance) => componentInstance.save(),
      nzComponentParams: { item },
      nzOkText: 'Salvar',
      nzCancelText: 'Cancelar',
    });
  }

  openDropdown(ev: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create(ev, menu);
  }

  openCommandsModal(position: Position): void {
    this.modal.create({
      nzTitle: 'Comandos',
      nzContent: CommandsModalComponent,
      nzComponentParams: {
        position,
      },
      nzOnOk: (componentInstance) => componentInstance.sendCommand(),
      nzOkText: 'Enviar',
      nzCancelText: 'Fechar',
      nzWidth: '70%',
    });
  }

  changeStatus(item: Position, travelStatus: string): void {
    this.modal.confirm({
      nzTitle: 'Deseja alterar o status da viagem?',
      nzOnOk: () => {
        this.monitoringRequestService.update(item.monitoringRequest.id, {
          travelStatus,
        } as any).subscribe(() => {
          this.message.success('Status alterado com sucesso');
        }, () => {
          this.message.error('Erro ao atualizar status');
        });
      }
    });
  }

  applyTravelStatusFilter(travelStatus: string): void {
    if (travelStatus === 'all') {
      this.selectedTravelStatus = null;
    } else {
      this.selectedTravelStatus = travelStatus;
    }

    this.stopMonitoring.next();
    this.subscribeToMonitoringData();
  }
}
