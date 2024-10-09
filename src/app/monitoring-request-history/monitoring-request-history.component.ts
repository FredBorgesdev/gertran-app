import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MonitoringRequestHistoryService } from './monitoring-request-history.service';

@Component({
  selector: 'app-monitoring-request-history',
  templateUrl: './monitoring-request-history.component.html',
  styleUrls: ['./monitoring-request-history.component.css']
})
export class MonitoringRequestHistory implements OnInit {
  isLoading = false;
  records: any[] = [];
  validateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private monitoringRequestHistoryService: MonitoringRequestHistoryService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      id: [null, [Validators.required]],
    });
  }

  searchMonitoringRequestHistory(): void {
    if (this.validateForm.valid) {
      const id = this.validateForm.get('id')?.value;
      this.isLoading = true;
      this.monitoringRequestHistoryService.getMonitoringRequestHistory(id).subscribe(
        (data) => {
          this.records = data;
          console.log('Dados recebidos:', this.records);
          this.isLoading = false;
        },
        (error) => {
          console.error('Erro ao buscar dados:', error);
          this.isLoading = false;
        }
      );
    }
  }

  getChangedFields(changes: any): any[] {
    const changedFields = [];
    
    const fieldMappings: { [key: string]: string } = {
      'user': 'Usuário',
      'truck': 'Cavalo',
      'terminal': 'Terminal',
      'driver': 'Motorista',
      'operation': 'Operação',
      'loadValue': 'Valor Carga',
      'trackerTechnology': 'Tecnologia de Rastreamento',
      'surveyConductedBy': 'Fonte Pesquisa Cadastral',
      'surveyConductedByOthers': 'Pesquisa Cadastral Outros',
      'loadDescription': 'Descrição Da Carga',
      'observations': 'Observação',
      'travelStatus': 'Status Da Viagem',
      'loadType': 'Tipo Da Carga',
      'status': 'Status'
    };

    for (const key in changes) {
      changedFields.push({ 
        name: fieldMappings[key] || key,
        value: changes[key] 
      });
    }
    
    return changedFields;
  }

  isObject(value: any): boolean {
    return value && typeof value === 'object' && !Array.isArray(value);
  }

  getLoadTypeName(loadType: any): string {
    const loadTypeMappings: { [key: string]: string } = {
      'unrefrigerated': 'Não refrigerado',
      'refrigerated': 'Refrigerado',
      'frozen': 'Congelado'
    };
  
    return loadTypeMappings[loadType] || 'loadType'; 
  }

  getSurveySourceName(surveySource: string): string {
    const surveySourceMappings: { [key: string]: string } = {
      'gertran': 'Gertran',
      'others': 'Outros',
      'both': 'Ambos'
    };
  
    return surveySourceMappings[surveySource] || surveySource;
  }

  getTripStatusName(tripStatus: any): string {
    const tripStatusMappings: { [key: string]: string } = {
      'contingency': 'Contingência',
      'driver_in_overnight': 'Motorista em Pernoite',
      'in_progress': 'Em Andamento',
      'logistic_management': 'Gestão Logística',
      'none': 'Nenhum',
      'priority': 'Prioritário',
      'stopped': 'Parado',
      'vehicle_in_customer': 'Veículo no Cliente',
      'waiting_for_start': 'Aguardando Início',
    };
  
    return tripStatusMappings[tripStatus] || tripStatus;
  }

  getStatusName(status: any): string {
    const statusMappings: { [key: string]: string } = {
      'draft': 'Rascunho',
      'under_review': 'Em avaliação',
      'waiting_for_start': 'Aguardando início',
      'in_progress': 'Em andamento',
      'reproved': 'Reprovada',
      'finished': 'Finalizada',
      'successfully_terminated': 'Terminada com sucesso',
      'canceled': 'Cancelada',
      'unsuccessfully_terminated': 'Terminada sem sucesso',
      'terminated_disapproved': 'Terminada reprovada',
      'potentially_stolen': 'Potencialmente roubada',
      'stolen_confirmed': 'Roubo confirmado',
      'pending': 'Pendente',
      'imported_unavailable': 'Importado indisponível'
    };

    return statusMappings[status] || status;
  }
}
