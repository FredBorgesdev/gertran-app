import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Monitoring, MonitoringService} from '../monitoring.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {MonitoringMapComponent} from '../monitoring-map/monitoring-map.component';
import {Customer, CustomersService} from '../../customers/customers.service';
import {Terminals, TerminalsService} from '../../terminals/terminals.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-monitoring-list',
  templateUrl: './monitoring-list.component.html',
  styleUrls: ['./monitoring-list.component.css']
})
export class MonitoringListComponent implements OnInit {
  isLoading = false;
  monitoringColumns = [
    { title: 'Tec' },
    { title: 'Rastreador' },
    { title: 'Viagem' },
    { title: 'Placa' },
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

  monitoringData: Monitoring[] = [];

  customers: Customer[] = [];
  terminals: Terminals[] = [];

  constructor(
    private router: Router,
    private service: MonitoringService,
    private message: NzMessageService,
    private modal: NzModalService,
    private customerService: CustomersService,
    private terminalsService: TerminalsService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.monitoringData = this.service.getAll();

    this.customerService.getAll({ limit: 999 }).subscribe(data => {
      this.customers = data.results;
    });
    this.terminalsService.getAll({ limit: 999 }).subscribe(data => {
      this.terminals = data.results;
    });

    this.validateForm = this.formBuilder.group({
      customer: [null],
      terminal: [null],
      groupBy: [null],
    });
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

  openMap(item: Monitoring): void {
    this.modal.create({
      nzTitle: 'Mapa',
      nzContent: MonitoringMapComponent,
      nzWidth: '900px',
      nzComponentParams: {
        item
      }
    });
  }
}
