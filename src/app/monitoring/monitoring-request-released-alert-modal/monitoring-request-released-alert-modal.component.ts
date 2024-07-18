import { Component, Input, OnInit } from '@angular/core';
import { AlertsService, MonitoringRequestReleasedAlerts } from '../alerts.service';
import { GetAllResponse, getCurrentPage, replaceOffsetWithPage } from 'src/app/shared/services/api.service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-monitoring-request-released-alert-modal',
  templateUrl: './monitoring-request-released-alert-modal.component.html',
  styleUrls: ['./monitoring-request-released-alert-modal.component.css']
})
export class MonitoringRequestReleasedAlertModalComponent implements OnInit {
  @Input() terminal: string;
  isLoading = false;

  constructor(
    private alertsService: AlertsService,

  ) {
  }

  monitoringRequestReleasedAlerts: GetAllResponse<MonitoringRequestReleasedAlerts>

  ngOnInit(): void {
    this.loadMonitoringRequestReleasedAlerts(null)
  }

  replaceOffsetWithPage(url: string, page: number): string {
    return replaceOffsetWithPage(url, page);
  }

  handleRoutesQueryParamsChange(params: NzTableQueryParams): void {
    if (params.pageIndex < this.page) {
      const url = this.replaceOffsetWithPage(this.monitoringRequestReleasedAlerts.previous, params.pageIndex);
      this.loadMonitoringRequestReleasedAlerts(url);
    } else if (params.pageIndex > this.page) {
      const url = this.replaceOffsetWithPage(this.monitoringRequestReleasedAlerts.next, params.pageIndex);
      this.loadMonitoringRequestReleasedAlerts(url);
    }
  }

  get page(): number {
    return getCurrentPage(this.monitoringRequestReleasedAlerts);
  }

  loadMonitoringRequestReleasedAlerts(url) {
    try {
      this.isLoading = true
      this.alertsService
        .getMonitoringRequesReleasedtAlerts(
          { url },
          {
            terminal: this.terminal,
            read_alert: true
          }
        ).toPromise().then(x => this.monitoringRequestReleasedAlerts = x)
      .then(()=>this.isLoading = false)
    } catch (error) {
      console.log(error)
    }
  }

  readMonitoringRequestReleasedAlert(alertId: string): void {
    this.isLoading = true
    this.alertsService.markMonitoringRequestReleasedAlertAsRead(alertId).subscribe(() => {
      this.isLoading = false
      this.loadMonitoringRequestReleasedAlerts(null)
    }, error => {
      console.error('Error marking alert as read:', error);
    });
  }
}
