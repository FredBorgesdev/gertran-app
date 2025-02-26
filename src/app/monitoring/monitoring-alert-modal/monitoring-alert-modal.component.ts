import {Component, Input, OnInit} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {Alert, AlertsService, AlertTypes, Severity, SeverityFlat} from '../alerts.service';
import {
  GetAllResponse,
  getCurrentPage,
} from '../../shared/services/api.service';
import {NzTableQueryParams} from 'ng-zorro-antd/table';
import {NzMessageService} from 'ng-zorro-antd/message';
import {CommandsModalComponent} from '../commands-modal/commands-modal.component';
import {Position} from '../positions.service';
import {MessagesModalComponent} from '../messages-modal/messages-modal.component';
import {UpdateObservationsModalComponent} from '../update-observations-modal/update-observations-modal.component';
import {MonitoringRequestsService} from '../../monitoring-requests/monitoring-requests.service';

@Component({
  selector: 'app-monitoring-alert-modal',
  templateUrl: './monitoring-alert-modal.component.html',
  styleUrls: ['./monitoring-alert-modal.component.css'],
})
export class MonitoringAlertModalComponent implements OnInit {
  @Input() severity: SeverityFlat;
  @Input() terminal?: string;
  @Input() customer?: string;
  @Input() monitoring_request?: string

  currentAlert: Alert;
  isUrgentModalOpen = false;
  isLoading = false;
  urgentMessage = '';

  alerts: GetAllResponse<Alert>;

  travelStatus = [
    {title: 'Parado', value: 'stopped'},
    {title: 'Em viagem', value: 'in_progress'},
    {title: 'Ag. Início', value: 'waiting_for_start'},
    {title: 'Cliente', value: 'vehicle_in_customer'},
    {title: 'Pernoite', value: 'driver_in_overnight'},
    {title: 'Nenhum', value: 'none'},
    {title: 'Gerenciamento logistico', value: 'logistic_management'},
    {title: 'Prioridade', value: 'priority'},
    {title: 'Contigência', value: 'contingency'},
  ];

  constructor(
    private modal: NzModalService,
    private alertsService: AlertsService,
    private message: NzMessageService,
    private monitoringRequestService: MonitoringRequestsService
  ) {
  }

  ngOnInit(): void {
    this.loadAlerts();
  }

  loadAlerts(url?: string): void {
    this.isLoading = true;
    this.alertsService
      .getAlerts(
        {url},
        {
          alertType: AlertTypes.terminal,
          severity: this.severity,
          terminal: this.terminal,
          customer: this.customer,
          monitoring_request: this.monitoring_request,
        }
      )
      .subscribe(
        (data: any) => {
          this.alerts = data;
          this.isLoading = false;

          this.markAsRead();
        },
        () => {
          this.isLoading = false;
        }
      );
  }

  markAsRead(): void {
    const ids = this.alerts.results
      .filter((alert) => !alert.readAt)
      .map((alert: Alert) => alert.id);

    if (!ids.length) {
      return;
    }

    this.alertsService.markAsRead(ids).subscribe(() => {
    });
  }

  markAsSolved(item: Alert): void {
    if (this.severity === Severity.danger && !this.urgentMessage) {
      this.isUrgentModalOpen = true;
      this.currentAlert = item;
      return;
    }

    this.isLoading = true;
    this.alertsService
      .markAsSolved(item.id, {
        solvedDescription: this.urgentMessage,
      })
      .subscribe(
        () => {
          this.message.success('Alerta marcado como lido com sucesso!');
          this.isLoading = false;
          this.isUrgentModalOpen = false;
          this.urgentMessage = '';
          this.currentAlert = null;
          this.loadAlerts();
        },
        () => {
          this.message.error('Erro ao marcar alerta como lido!');
          this.isLoading = false;
        }
      );
  }

  resolveAlert(): void {
    this.modal.confirm({
      nzTitle: 'Deseja realmente resolver a urgência?',
      nzContent:
        'Ao resolver a urgência, o alerta será marcado como lido e não será mais exibido.',
      nzOkText: 'Sim',
      nzOkType: 'primary',
      nzOnOk: () => {
        this.markAsSolved(this.currentAlert);
      },
      nzCancelText: 'Não',
    });
  }

  get isUrgent(): boolean {
    return this.severity === Severity.danger;
  }

  get page(): number {
    return getCurrentPage(this.alerts);
  }

  handleQueryParamsChange(params: NzTableQueryParams): void {
    if (params.pageIndex < this.page) {
      const url = this.replaceOffsetWithPage(
        this.alerts.previous,
        params.pageIndex
      );
      this.loadAlerts(url);
    } else if (params.pageIndex > this.page) {
      const url = this.replaceOffsetWithPage(
        this.alerts.next,
        params.pageIndex
      );
      this.loadAlerts(url);
    }
  }

  replaceOffsetWithPage(url: string, page: number): string {
    const limit = +url.match(/limit=\d+/)[0].split('=')[1];

    return url.replace(/offset=\d+/, `offset=${limit * page - limit}`);
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

  changeStatus(alert: Alert, travelStatus: string): void {
    this.modal.confirm({
      nzTitle: 'Deseja alterar o status da viagem?',
      nzOnOk: () => {
        this.monitoringRequestService
          .update(alert.position.monitoringRequest.id, {
            travelStatus,
          } as any)
          .subscribe(
            () => {
              this.message.success('Status alterado com sucesso');
            },
            () => {
              this.message.error('Erro ao atualizar status');
            }
          );
      },
    });
  }

  openUpdateObservationModal(item: Alert): void {
    this.modal.create({
      nzTitle: item.message,
      nzContent: UpdateObservationsModalComponent,
      nzOnOk: (componentInstance) => componentInstance.save(),
      nzComponentParams: {
        truckId: item.position.monitoringRequest.truck.id,
        observation: item.position.monitoringRequest.truck.vehicle.description,
      },
      nzOkText: 'Salvar',
      nzCancelText: 'Cancelar',
    });
  }
}
