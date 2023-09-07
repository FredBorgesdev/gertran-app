import {format} from 'date-fns';
import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable, Subject, timer} from 'rxjs';
import {share, switchMap, takeUntil} from 'rxjs/operators';
import {NzContextMenuService, NzDropdownMenuComponent} from 'ng-zorro-antd/dropdown';
import {GetAllResponse} from '../../../shared/services/api.service';
import {Position, PositionsService} from '../../../monitoring/positions.service';
import {AlertCount, AlertsService, AlertTypes} from '../../../monitoring/alerts.service';
import {Customer, CustomersService} from '../../../customers/customers.service';
import {Terminals, TerminalsService} from '../../../terminals/terminals.service';
import {MonitoringRequestsService} from '../../../monitoring-requests/monitoring-requests.service';
import {SelectableCustomerServiceService} from '../../../customers/selectable-customer-service.service';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {MonitoringMapComponent} from '../../../monitoring/monitoring-map/monitoring-map.component';
import User from '../../../users/user';

const PLATE_KEY = 'GERTRAN_LAST_PLATE';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit, OnDestroy {
  isLoading = false;
  monitoringColumns = [
    {title: 'Tec', width: '40px'},
    {title: 'Placa', width: '60px'},
    {title: 'SM', width: '80px'},
    {title: 'Ig', width: '35px'},
    {title: '%', width: '50px'},
    {title: 'Mapa', width: '45px'},
    {title: 'Origem', width: '110px'},
    {title: 'Destino', width: '110px'},
    {title: 'Posição', width: '110px'},
    {title: 'Data/hora inicio de viagem', style: 'font-size: 7px; text-align: center;'},
    {title: 'Data/hora previsão de fim', style: 'font-size: 7px; text-align: center;'},
  ];
  validateForm: FormGroup;

  stopMonitoring = new Subject();
  monitoringData$: Observable<GetAllResponse<Position>>;
  monitoringData: Position[] = null;
  alertsCount: AlertCount = null;
  refreshPositions = new EventEmitter();

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
    this.monitoringData$ = timer(0, 100000).pipe(
      switchMap(() => this.getPositionsWithFilters()),
      share(),
      takeUntil(this.stopMonitoring)
    );

    this.refreshAlertCount.subscribe(() => this.setAlertsCount());
    this.refreshPositions.subscribe(() => this.subscribeToMonitoringData());

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
    if (item.positionInfo?.originCity) {
      return item.positionInfo.originCity + ', ' + item.positionInfo.originState;
    }

    return item.origin;
  }

  getDestiny(item: Position): string {
    if (item.positionInfo?.destinyCity) {
      return item.positionInfo.destinyCity + ', ' + item.positionInfo.destinyState;
    }

    return item.destiny;
  }

  getAlerts(item: Position): string {
    if (!item.events || !item.events.length) {
      return '';
    }

    const lastEvent = item.events[item.events.length - 1];
    const dateFormatted = format(new Date(lastEvent.createdAt), 'dd/MM/yyyy HH:mm:ss');
    return `${lastEvent.eventDescription} - ${dateFormatted}`;
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
    }, () => {
      this.isLoading = false;
      this.message.error('Erro ao carregar lista');
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

  get plate(): string {
    return localStorage.getItem(PLATE_KEY) || '';
  }

  setPlate(plate: string): void {
    localStorage.setItem(PLATE_KEY, plate);
  }

  get user(): User {
    return this.authService.user;
  }

  private getPositionsWithFilters(): Observable<GetAllResponse<Position>> {
    return this.positionsService.getAll(
      {limit: 50},
      {
        customer: this.validateForm.get('customer').value,
        terminal: this.validateForm.get('terminal').value,
        travelling: this.validateForm.get('travelling').value,
        travelStatus: this.selectedTravelStatus,
      }
    );
  }

  getStartTravelDate(item: Position): string {
    const travelStep = item.monitoringRequest.travelSteps?.[0];
    if (!travelStep) {
      return '-';
    }

    const dateTime = `${travelStep.date} ${travelStep.time}`;

    return format(new Date(dateTime), 'dd/MM/yyyy HH:mm:ss');
  }

  getEndTravelDate(item: Position): string {
    const travelStep = item.monitoringRequest.travelSteps?.[item.monitoringRequest.travelSteps.length - 1];
    if (!travelStep) {
      return '-';
    }

    const dateTime = `${travelStep.date} ${travelStep.time}`;

    return format(new Date(dateTime), 'dd/MM/yyyy HH:mm:ss');
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
