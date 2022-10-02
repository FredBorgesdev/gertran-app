import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MonitoringRequestsService} from '../monitoring-requests.service';
import {NzMessageService} from 'ng-zorro-antd/message';

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
    private message: NzMessageService
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
}
