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
  validateForm: FormGroup;

  stopMonitoring = new Subject();
  monitoringData$: Observable<GetAllResponse<Position>>;
  monitoringData: Position[] = [];

  customers: Customer[] = [];
  terminals: Terminals[] = [];

  isTableFullscreen = false;
  notFound = false;

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

    this.monitoringData$ = timer(0, 1000000).pipe(
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

  getAlertColor(alert: string): string {
    return {
      warning: 'yellow',
      danger: 'red',
    }[alert];
  }

  getRowBackgroundColor(status: string): string {
    return {
      warning: 'bg-warning',
      danger: 'bg-danger',
      success: 'bg-success',
      info: 'bg-info',
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
    return item.monitoringRequest.originCity + ', ' + item.monitoringRequest.originState;
  }

  getDestiny(item: Position): string {
    return item.monitoringRequest.destinyCity + ', ' + item.monitoringRequest.destinyState;
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
    this.monitoringData$.subscribe(data => {
      this.monitoringData = data.results;
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
}
