import {Component, Input, OnInit} from '@angular/core';
import {Position} from '../positions.service';
import {Incident, IncidentsService} from '../incidents.service';
import {GetAllResponse, getCurrentPage, replaceOffsetWithPage} from '../../shared/services/api.service';
import {NzTableQueryParams} from 'ng-zorro-antd/table';
import {NzModalService} from 'ng-zorro-antd/modal';
import {CreateIncidentModalComponent} from '../../incidents/create-incident-modal/create-incident-modal.component';
import {IncidentDetailsModalComponent} from "../incident-details-modal/incident-details-modal.component";
import {NzMessageService} from "ng-zorro-antd/message";

const fieldTranslations = {
  monitoring_request: 'Viagem monitorada',
  incident_type: 'Tipo de ocorrência',
  incident_date: 'Data da ocorrência',
  incident_location: 'Local da ocorrência',
  driver_contacted_at: 'Motorista contatado em',
  driver_name: 'Nome do motorista',
  driver_phone: 'Telefone do motorista',
  shipper_name: 'Nome do transportador',
  shipper_contacted_at: 'Transportador contatado em',
  was_immediate_action_approved: 'Autorização pronta resposta',
  immediate_action_responsible_name: 'Nome do responsável pela pronta resposta',
  immediate_action_taken_at: 'Autorização pronta resposta em',
  was_federal_police_action_needed: 'Contato orgãos publicos',
  federal_police_action_responsible_name: 'Nome do responsável pelo contato com orgãos publicos',
  federal_police_action_taken_at: 'Contato orgãos publicos em',
  additional_information: 'Informações adicionais',
  optional_email: 'Email opcional',
  incident_latitude: 'Latitude da ocorrência',
  incident_longitude: 'Longitude da ocorrência',
  incident_datetime: 'Data e hora da ocorrência',
};

@Component({
  selector: 'app-incidents-modal',
  templateUrl: './incidents-modal.component.html',
  styleUrls: ['./incidents-modal.component.css']
})
export class IncidentsModalComponent implements OnInit {
  @Input() position: Position;
  @Input() blank: boolean = false;
  isLoading = false;
  incidentsColumns = [
    {title: 'Id'},
    {title: 'Viagem'},
    {title: 'Data'},
    {title: 'Criado por'},
    {title: 'Tipo'},
    {title: 'Descrição'},
    {title: 'Ações'}
  ];

  incidents: GetAllResponse<Incident>;

  constructor(
    private service: IncidentsService,
    private modal: NzModalService,
    private message: NzMessageService,
  ) {
  }

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
    let isButtonDisabled = false; // Variável para controlar o estado do botão

    const modal = this.modal.create({
      nzTitle: 'Criar evento',
      nzContent: CreateIncidentModalComponent,
      nzComponentParams: {
        monitoringRequest: this.position.monitoringRequest,
        driver: {
          name: this.position.positionInfo.driverName,
          phone: this.position.positionInfo.driverPhone,
        },
        blank: this.blank
      },
      nzWidth: '80%',
      nzOkText: 'Salvar',
      nzCancelText: 'Cancelar',
      nzOkDisabled: isButtonDisabled, // O botão começa habilitado

      nzOnOk: async (componentInstance) => {
        this.isLoading = true;

        await componentInstance.save({
          success: () => {
            this.loadIncidents();
            this.isLoading = false;
            modal.close();
            this.message.success('Ocorrência criada com sucesso!');
          },
          error: (err) => {
            let message = '';
            Object.entries(err?.error?.extra?.fields ?? {})?.forEach(([key, field]) => {
              message += `<p>${fieldTranslations[key] ?? key}: ${field}</p>`;
            });
            if (message === '') {
              message = 'Erro ao enviar a solicitação. Tente novamente.';
            }

            this.isLoading = false;
            this.message.error(message, {nzDuration: 7000});
          }
        });

        // Desabilitar o botão por 5 segundos
        isButtonDisabled = true;
        modal.updateConfig({
          nzOkDisabled: isButtonDisabled
        });

        setTimeout(() => {
          isButtonDisabled = false;
          modal.updateConfig({
            nzOkDisabled: isButtonDisabled
          });
        }, 5000); // Reabilitar o botão após 5 segundos


        return false;
      },
    });
  }

  openIncidentDetailsModal(incident: Incident): void {
    this.modal.create({
      nzTitle: 'Detalhes da ocorrência',
      nzContent: IncidentDetailsModalComponent,
      nzComponentParams: {
        incident,
        blank:this.blank
      },
      nzWidth: '80%',
      nzFooter: null,
    });
  }

  getCreatedBy(data: Incident): string {
    if (data.wasAddedByAutomation) {
      return 'Automação';
    }

    return data.createdBy?.name ?? 'Não disponível';
  }
}
