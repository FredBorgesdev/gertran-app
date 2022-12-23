import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MonitoringRequestsService} from '../monitoring-requests.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-monitoring-request',
  templateUrl: './monitoring-request.component.html',
  styleUrls: ['./monitoring-request.component.css']
})
export class MonitoringRequestComponent implements OnInit {
  isLoading = false;
  resource = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: MonitoringRequestsService,
    private message: NzMessageService,
    private modal: NzModalService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.paramMap.has('id')) {
      this.loadMonitoringRequest();
    }
  }

  loadMonitoringRequest(): void {
    this.isLoading = true;
    this.service.get(this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe(data => {
        this.resource = data;
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
        this.message.error('Erro ao carregar o registro. Tente novamente.');
      });
  }

  updateRouteCoordinates(routeCoordinates: any[]): void {
    this.service.update(this.resource.id, {
      routeCoordinates
    } as any).subscribe(() => {
      this.loadMonitoringRequest();
    });
  }

  send(): void {
    this.modal.confirm({
      nzTitle: 'Deseja enviar a solicitação?',
      nzContent: 'Ao enviar a solicitação, não será mais possível editá-la.',
      nzOnOk: () => {
        this.isLoading = true;
        (this.service as MonitoringRequestsService).send(
          this.resource.id,
        ).subscribe(
          () => {
            this.message.success('Solicitação enviada com sucesso!');
            this.router.navigate(['/monitoring-requests/monitoring-requests-list']);
            this.isLoading = false;
          },
          (error) => {
            let message = '';
            Object.values(error?.error?.extra?.fields)?.forEach(field => {
              message += `<p>${field}</p>`;
            });
            this.isLoading = false;
            this.message.error(message, { nzDuration: 7000 });
          });
      },
    });
  }

}
