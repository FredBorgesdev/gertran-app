import {Component, Input, OnInit} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {Alert, AlertsService, AlertTypes, Severity} from '../alerts.service';
import {GetAllResponse, getCurrentPage} from '../../shared/services/api.service';
import {NzTableQueryParams} from 'ng-zorro-antd/table';

@Component({
  selector: 'app-monitoring-alert-modal',
  templateUrl: './monitoring-alert-modal.component.html',
  styleUrls: ['./monitoring-alert-modal.component.css']
})
export class MonitoringAlertModalComponent implements OnInit {
  @Input() severity: Severity;

  isUrgentModalOpen = false;
  isLoading = false;
  urgentMessage = '';

  alerts: GetAllResponse<Alert>;

  constructor(
    private modal: NzModalService,
    private alertsService: AlertsService,
  ) { }

  ngOnInit(): void {
    this.loadAlerts();
  }

  loadAlerts(url?: string): void {
    this.isLoading = true;
    this.alertsService.getAlerts({ url }, {
      alertType: AlertTypes.terminal,
      severity: this.severity,
    }).subscribe((data: any) => {
      this.alerts = data;
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }

  markAsRead(item: any): void {
    if (this.severity === Severity.danger) {
      this.isUrgentModalOpen = true;
      return;
    }
  }

  resolveAlert(): void {
    this.modal.confirm({
      nzTitle: 'Deseja realmente resolver a urgência?',
      nzContent: 'Ao resolver a urgência, o alerta será marcado como lido e não será mais exibido.',
      nzOkText: 'Sim',
      nzOkType: 'primary',
      nzOnOk: () => {
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
          this.isUrgentModalOpen = false;
        }, 1000);
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
      const url = this.replaceOffsetWithPage(this.alerts.previous, params.pageIndex);
      this.loadAlerts(url);
    } else if (params.pageIndex > this.page) {
      const url = this.replaceOffsetWithPage(this.alerts.next, params.pageIndex);
      this.loadAlerts(url);
    }
  }

  replaceOffsetWithPage(url: string, page: number): string {
    const limit = +url.match(/limit=\d+/)[0].split('=')[1];

    return url.replace(/offset=\d+/, `offset=${(limit * page) - limit}`);
  }
}
