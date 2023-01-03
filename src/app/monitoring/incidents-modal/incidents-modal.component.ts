import {Component, Input, OnInit} from '@angular/core';
import {Position} from '../positions.service';
import {Incident, IncidentsService} from '../incidents.service';
import {GetAllResponse, getCurrentPage, replaceOffsetWithPage} from '../../shared/services/api.service';
import {NzTableQueryParams} from 'ng-zorro-antd/table';
import {NzModalService} from 'ng-zorro-antd/modal';
import {CreateIncidentModalComponent} from '../../incidents/create-incident-modal/create-incident-modal.component';

@Component({
  selector: 'app-incidents-modal',
  templateUrl: './incidents-modal.component.html',
  styleUrls: ['./incidents-modal.component.css']
})
export class IncidentsModalComponent implements OnInit {
  @Input() position: Position;
  isLoading = false;
  incidentsColumns = [
    { title: 'Id' },
    { title: 'Viagem' },
    { title: 'Data' },
    { title: 'Criado por' },
    { title: 'Tipo' },
    { title: 'Descrição' },
    { title: 'Resolução' },
    { title: 'Status' },
    // { title: 'Ações' }
  ];

  incidents: GetAllResponse<Incident>;

  constructor(
    private service: IncidentsService,
    private modal: NzModalService,
  ) { }

  ngOnInit(): void {
    this.loadIncidents();
  }

  loadIncidents(url?: string): void {
    this.isLoading = true;
    this.service.getAll({
      url
    }, {
      monitoringRequest: this.position.monitoringRequest.id
    }).subscribe(response => {
      this.incidents = response;
      this.isLoading = false;
    });
  }

  get page(): number {
    return getCurrentPage(this.incidents);
  }

  replaceOffsetWithPage(url: string, page: number): string {
    return replaceOffsetWithPage(url, page);
  }

  handleQueryParamsChange(params: NzTableQueryParams): void {
    if (params.pageIndex < this.page) {
      const url = this.replaceOffsetWithPage(this.incidents.previous, params.pageIndex);
      this.loadIncidents(url);
    } else if (params.pageIndex > this.page) {
      const url = this.replaceOffsetWithPage(this.incidents.next, params.pageIndex);
      this.loadIncidents(url);
    }
  }

  openCreateIncidentModal(): void {
    this.modal.create({
      nzTitle: 'Criar evento',
      nzContent: CreateIncidentModalComponent,
      nzComponentParams: {
        monitoringRequest: this.position.monitoringRequest
      },
      nzWidth: '80%',
      nzOkText: 'Salvar',
      nzCancelText: 'Cancelar',
      nzOnOk: (componentInstance) => componentInstance.save(),
    });
  }
}
