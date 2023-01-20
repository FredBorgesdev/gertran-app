import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
import {prop} from 'ramda';
import {NzContextMenuService, NzDropdownMenuComponent} from 'ng-zorro-antd/dropdown';
import {CommandsModalComponent} from '../commands-modal/commands-modal.component';
import {MonitoringRequestsService} from '../../monitoring-requests/monitoring-requests.service';
import {MessagesModalComponent} from '../messages-modal/messages-modal.component';
import {SelectableCustomerServiceService} from '../../customers/selectable-customer-service.service';
import {AlertCount, AlertsService, AlertTypes, Severity} from '../alerts.service';
import {
  MonitoringRequestsCheckListComponent
} from '../../monitoring-requests/monitoring-requests-check-list/monitoring-requests-check-list.component';
import {IncidentsModalComponent} from '../incidents-modal/incidents-modal.component';
import {AuthenticationService} from '../../authentication/authentication.service';
import User from '../../users/user';

const PLATE_KEY = 'GERTRAN_LAST_PLATE';

@Component({
  selector: 'app-monitoring-list',
  templateUrl: './monitoring-list.component.html',
  styleUrls: ['./monitoring-list.component.css']
})
export class MonitoringListComponent implements OnInit, OnDestroy {
  isLoading = false;
  monitoringColumns = [
    {title: 'Tec', nzLeft: true, style: 'z-index: 999', width: '40px'},
    {title: 'Rastreador', nzLeft: true, style: 'z-index: 999', width: '90px'},
    {title: 'Viagem', nzLeft: true, style: 'z-index: 999', width: '90px'},
    {title: 'Placa', nzLeft: true, style: 'z-index: 999', width: '60px'},
    {title: 'Ign', width: '40px'},
    {title: 'Ale', width: '40px', gertranStaffOnly: true},
    {title: 'Automação', width: '90px'},
    {title: 'Mapa', width: '50px'},
    {title: '%', width: '100px'},
    {title: 'Vel', width: '50px'},
    {title: 'Cliente', width: '110px'},
    {title: 'Data/Hora', width: '90px'},
    {title: 'Posição', width: '110px'},
    {title: 'Origem', width: '110px'},
    {title: 'Destino', width: '110px'},
    {title: 'Alertas', width: '80px', gertranStaffOnly: true},
    {title: 'Status V.', width: '80px', gertranStaffOnly: true},
    {title: 'Obs.', width: '110px', gertranStaffOnly: true},
    {title: 'Motorista', width: '110px'},
    {title: 'Carreta', width: '80px'},
    {title: 'Comunicação', width: '100px', gertranStaffOnly: true},
    {title: 'Macro', width: '55px', gertranStaffOnly: true},
    {title: 'Int. Emb.', width: '50px', gertranStaffOnly: true},
    {title: 'Isca', width: '50px', gertranStaffOnly: true},
    {title: 'Temp.', width: '50px'},
  ];
  validateForm: FormGroup;

  stopMonitoring = new Subject();
  monitoringData$: Observable<GetAllResponse<Position>>;
  monitoringData: Position[] = null;
  alertsCount: AlertCount = null;

  customers: Customer[] = [];
  terminals: Terminals[] = [];

  isTableFullscreen = false;
  selectedTravelStatus: string;

  automations = [
    {icon: 'check-circle', color: 'orane', text: 'Excesso de velocidade'},
    {icon: 'eye', color: 'red', text: 'Desvio de rota'},
    {icon: 'credit-card', color: 'blue', text: 'Parada prolongada'},
    {icon: 'car', color: 'blue', text: 'Parada abastecimento'},
  ];
  travelStatus = [
    {title: 'Parado', value: 'stopped', backgroundColorClass: 'bg-info'},
    {title: 'Em viagem', value: 'in_progress', backgroundColorClass: 'bg-success'},
    {title: 'Ag. Início', value: 'waiting_for_start', backgroundColorClass: 'bg-alert'},
    {title: 'Cliente', value: 'vehicle_in_customer', backgroundColorClass: 'bg-warning'},
    {title: 'Pernoite', value: 'driver_in_overnight', backgroundColorClass: 'bg-alert'},
    {title: 'Nenhum', value: 'none', backgroundColorClass: 'bg-gray-lightest'},
    {title: 'Gerenciamento logistico', value: 'logistic_management', backgroundColorClass: 'bg-gray-lightest'},
    {title: 'Prioridade', value: 'priority', backgroundColorClass: 'bg-gray-lightest'},
    {title: 'Contigência', value: 'contingency', backgroundColorClass: 'bg-danger'},
  ];

  refreshAlertCount = new EventEmitter();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private message: NzMessageService,
    private modal: NzModalService,
    private customerService: CustomersService,
    private terminalsService: TerminalsService,
    private formBuilder: FormBuilder,
    private positionsService: PositionsService,
    private nzContextMenuService: NzContextMenuService,
    private monitoringRequestService: MonitoringRequestsService,
    public selectableCustomerService: SelectableCustomerServiceService,
    private alertsService: AlertsService,
    public authService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.monitoringColumns = this.monitoringColumns.filter(column => {
      if (column.gertranStaffOnly) {
        return this.user.isGertranStaff;
      }
      return true;
    });

    this.monitoringData$ = timer(0, 100000).pipe(
      switchMap(() => this.getPositionsWithFilters()),
      share(),
      takeUntil(this.stopMonitoring)
    );

    this.refreshAlertCount.subscribe(() => this.setAlertsCount());

    this.validateForm = this.formBuilder.group({
      customer: [this.activatedRoute.snapshot.queryParams.customer],
      terminal: [this.activatedRoute.snapshot.queryParams.terminal],
      travelling: [this.activatedRoute.snapshot.queryParams.travelling || true],
      hideOld: [true],
      groupBy: [null],
    });

    this.loadFiltersList();

    if (
      this.activatedRoute.snapshot.queryParams.terminal ||
      this.activatedRoute.snapshot.queryParams.customer ||
      this.authService.customerId
    ) {
      this.subscribeToMonitoringData();
    }
  }

  loadFiltersList(): void {
    if (this.authService.customerId) {
      const customer = this.authService.user.customer.find(c => c.id === this.authService.customerId);
      this.customers = [customer];
      this.validateForm.patchValue({customer: this.authService.customerId});
      return;
    }

    this.selectableCustomerService.init();
    this.terminalsService.getAll({limit: 50}).subscribe(data => {
      this.terminals = data.results;
    });
  }

  ngOnDestroy(): void {
    this.stopMonitoring.next();
  }

  getRowBackgroundColor(status: string): string {
    if (!this.user.isGertranStaff) {
      return '';
    }
    return this.travelStatus.find(item => item.value === status)?.backgroundColorClass;
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
    if (item.info?.originCity) {
      return item.info.originCity + ', ' + item.info.originState;
    }

    return item.origin;
  }

  getDestiny(item: Position): string {
    if (item.info?.destinyCity) {
      return item.info.destinyCity + ', ' + item.info.destinyState;
    }

    return item.destiny;
  }

  getAlerts(item: Position): string {
    return item.events.map(prop('eventDescription')).join(', ');
  }

  loadPositions(): void {
    this.router.navigate([], {
      queryParams: {
        customer: this.validateForm.get('customer').value,
        terminal: this.validateForm.get('terminal').value,
        travelling: this.validateForm.get('travelling').value,
        'navbar-closed': true,
      }
    });

    this.subscribeToMonitoringData();
  }

  subscribeToMonitoringData(): void {
    if (
      !this.validateForm.get('customer').value &&
      !this.validateForm.get('terminal').value
    ) {
      this.monitoringData = null;
      return;
    }

    this.isLoading = true;
    this.stopMonitoring.next();

    this.setAlertsCount();

    this.monitoringData$.subscribe(data => {
      this.monitoringData = data.results;
      this.isLoading = false;

      this.updatePositionsPointReferences();
    }, () => {
      this.isLoading = false;
      this.message.error('Erro ao carregar lista');
    });
  }

  openAlertModal(severity: Severity): void {
    this.modal.create({
      nzTitle: 'Alertas',
      nzContent: MonitoringAlertModalComponent,
      nzComponentParams: {
        severity,
        terminal: this.validateForm.get('terminal').value,
        customer: this.validateForm.get('customer').value,
      },
      nzOkText: 'Fechar',
      nzCancelText: null,
      nzWidth: '70%',
      nzAfterClose: this.refreshAlertCount,
    });
  }

  getLastEvent(item: Position): any {
    return item.events[item.events.length - 1];
  }

  openAutomationModal(automations: Position): void {
    // if (automations.length === 0) {
    //   return;
    // }
    //
    // this.modal.create({
    //   nzTitle: 'Automação',
    //   nzContent: MonitoringEventModalComponent,
    //   nzComponentParams: {
    //     automations,
    //   },
    //   nzWidth: '90%',
    //   nzOkText: 'Fechar',
    //   nzCancelText: null,
    // });
  }

  getStatusTranslation(status: string): string {
    return this.travelStatus.find(item => item.value === status)?.title;
  }

  goToMonitoringRequest(id: string): void {
    this.modal.create({
      nzTitle: 'Solicitação de monitoramento',
      nzContent: MonitoringRequestsCheckListComponent,
      nzComponentParams: {monitoringRequestId: id, readOnly: true},
      nzWidth: '90%',
      nzOkText: null,
      nzOnOk: null,
    });
  }

  openUpdateObservationModal(item: Position): void {
    this.modal.create({
      nzTitle: item.customer.name,
      nzContent: UpdateObservationsModalComponent,
      nzOnOk: (componentInstance) => componentInstance.save(),
      nzComponentParams: {item},
      nzOkText: 'Salvar',
      nzCancelText: 'Cancelar',
    });
  }

  openDropdown(
    ev: MouseEvent,
    menu: NzDropdownMenuComponent,
    item: Position
  ): void {
    if (!this.user.isGertranStaff) {
      return;
    }
    this.setPlate(item.vehiclePlate);
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

  openMessagesModal(position: Position): void {
    this.modal.create({
      nzTitle: 'Mensagens',
      nzContent: MessagesModalComponent,
      nzComponentParams: {
        position,
      },
      nzOnOk: (componentInstance) => componentInstance.sendMessage(),
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

          this.monitoringData = this.monitoringData.map(data => {
            if (data.id === item.id) {
              return {
                ...data,
                monitoringRequest: {
                  ...data.monitoringRequest,
                  travelStatus,
                },
              };
            }

            return data;
          });
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

  getCommunicationChannel(currentCommunicationChannel: string): string {
    return {
      undefined: 'Indefinido',
      gprs: 'Rádio',
      gps: 'Satelital',
      gsm: 'Celular',
    }[currentCommunicationChannel] || 'Indefinido';
  }

  getAlertIcon(item: Position): {
    icon: string;
    color: string;
  } | null {
    const lastEvent = this.getLastEvent(item);

    return {
      urgent: {
        icon: 'exclamation-circle',
        color: '#ff5b5b',
      },
      alert: {
        icon: 'exclamation-circle',
        color: '#c4ad00',
      },
      information: {
        icon: 'mail',
        color: '#008ccb',
      },
      system: {
        icon: 'mail',
        color: '#626262',
      },
      macro: {
        icon: 'mail',
        color: '#626262',
      }
    }[lastEvent.eventType] || null;
  }

  get plate(): string {
    return localStorage.getItem(PLATE_KEY) || '';
  }

  setPlate(plate: string): void {
    localStorage.setItem(PLATE_KEY, plate);
  }

  openIncidentsModal(item: Position): void {
    this.modal.create({
      nzTitle: 'Ocorrências',
      nzContent: IncidentsModalComponent,
      nzWidth: '80%',
      nzComponentParams: {
        position: item,
      },
    });
  }

  formatPercent(percent: number): string {
    return `${percent.toFixed(1)}%`;
  }

  get user(): User {
    return this.authService.user;
  }

  private updatePositionsPointReferences(): void {
    const positionsIds = this.monitoringData.map(item => item.id);
    this.positionsService.updatePointReferences(positionsIds).subscribe((updatedPositions) => {
      this.monitoringData = this.monitoringData.map((position) => {
        const updatedPosition = updatedPositions.find(item => item.id === position.id);

        if (updatedPosition) {
          return {
            ...position,
            pointReference: updatedPosition.pointReference,
          };
        }

        return position;
      });
    });
  }

  private getPositionsWithFilters(): Observable<GetAllResponse<Position>> {
    return this.positionsService.getAll(
      {limit: 999},
      {
        customer: this.validateForm.get('customer').value,
        terminal: this.validateForm.get('terminal').value,
        travelling: this.validateForm.get('travelling').value,
        travelStatus: this.selectedTravelStatus,
      }
    );
  }

  private setAlertsCount(): void {
    this.alertsService.getAlertsCount(
      this.validateForm.value,
      AlertTypes.terminal
    ).subscribe((response) => {
      this.alertsCount = response;
    });
  }
}
