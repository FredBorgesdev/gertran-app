import { Component, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';
import { Protocol, ProtocolsService } from '../protocols.service';

@Component({
  selector: 'app-monitoring-protocol-list',
  templateUrl: './protocol-list.component.html',
  styleUrls: ['./protocol-list.component.css']
})
export class MonitoringProtocolListComponent implements OnInit, OnDestroy {
  @Input() monitoringRequestId: string;
  @Input() readOnly = false;
  @Input() showFooter = false;

  isLoading = false;
  data: Protocol[]

  refreshAlertCount = new EventEmitter();

  constructor(
    public protocolsService: ProtocolsService
  ) {
  }

  ngOnInit(): void {
    this.protocolsService.get(this.monitoringRequestId).subscribe(
      (result) => {
        this.data = result.results;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao obter os dados:', error);
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy(): void {
  }
}