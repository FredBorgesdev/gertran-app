import {Component , ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import {Incident} from "../incidents.service";
import {getLocaleFirstDayOfWeek} from "@angular/common";
import { Choice } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-incident-details-modal',
  templateUrl: './incident-details-modal.component.html',
  styleUrls: ['./incident-details-modal.component.css']
})
export class IncidentDetailsModalComponent {
  @Input() incident: Incident;
  @Input() blank: boolean = false;
  procedure1String: string;
  procedure2String: string;
  procedure3String: string;
  procedure4String: string;
  procedure5String: string;
  procedure6String: string;
  procedure7String: string;
  printConfig = {
    printMode: 'template-popup',
    popupProperties: 'toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,fullscreen=yes',
    pageTitle: '',
    styles: [
    `
    @media print {
        @page {
          margin: 5mm;
        }

      .table-header {
        text-transform: uppercase; 
        font-size: 16px  !important;
        font-weight: bolder; 
        background-color: gainsboro !important;
    }



      .info-cell {
        color: white;
      }

    }

    .moldura {
        padding: 3px;
        margin: 20px 0;
    }

    .custom-bordered-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
    }

    .custom-bordered-table th,
    .custom-bordered-table td {
        border: 1px solid #000;
        padding: 1px;
        font-size: 8px;
        text-align: left;
        font-weight: bold;
    }

    .custom-bordered-table th {
        background-color: #f2f2f2;
        font-weight: bold;
    }

    .logo {
        max-width: 100px;
        max-height: 100px;
    }

    .table-header {
        text-transform: uppercase; 
        font-size: 16px  !important;
        font-weight: bolder; 
        background-color: gainsboro !important;
    }


    .cell{
        text-transform: uppercase;
    }

    `
    ],
  };

  constructor() {
  }

  incidentTypes: Choice[] = [
    {label: 'Desvio de rota', value: 'route_detour'},
    {label: 'Retido em posto fiscal', value: 'apprehension_of_inspection_fee'},
    {label: 'Botão de pânico', value: 'panic_button'},
    {label: 'Perda de sinal', value: 'signal_loss'},
    {label: 'Violação de sensor', value: 'sensor_violation_alert'},
    // {label: 'Problema Mecânico/Eletrico', value: 'mechanical_issue'},
    {label: 'Problema mecânico', value: 'mechanical_issue'},
    {label: 'Veículo em Manutenção', value: 'vehicle_under_maintenance'},
    {label: 'Acidente', value: 'accident'},
    {label: 'Parada sem informar', value: 'stop_without_notify'},
    {label: 'Reinicio de viagem sem informar', value: 'restart_traveling_without_notify'},
    {label: 'Veiculo suspeito', value: 'suspicious_vehicle'},
    {label: 'Desvio de rota', value: 'convoy_detour'},
    {label: 'Roubo', value: 'steal'},
    {label: 'Tombamento', value: 'overturning'},
    {label: 'Furto parcial', value: 'partial_theft'},
    {label: 'Assistencia técnica', value: 'technical_assistance'},
    {label: 'Evento teste', value: 'incident_test'},
    // {label: 'Outro', value: 'others'},
    {label: 'Furto', value: 'theft'},
    // {label: 'Não condizente com as regras', value: 'non_compliance_with_rules'},
    {label: 'Sem solicitação de monitoramento', value: 'without_monitoring_request'},
    {label: 'Parada prolongada', value: 'extended_stop'},
    {label: 'Acidente com terceiros', value: 'accident_with_third_party'},
    {label: 'Excesso de velocidade', value: 'speeding'},
    {label: 'Possivel ação de jammer', value: 'possible_jammer_action'},
    {label: 'Retirada do espelhamento', value: 'mirroring_removal'},
    // {label: 'Atraso inicio de viagem', value: 'delay_start_of_traveling'},
    {label: 'Inicio de viagem sem informar', value: 'start_traveling_without_notify'},
    {label: 'Fim de viagem sem informar', value: 'finish_traveling_without_notify'},
    {label: 'Ausencia no inicio de mensagem (macro)', value: 'failure_to_send_message_or_macro'},
    {label: 'Falha no espelhamento', value: 'mirror_failure'},
    {label: 'Interferencia no monitoramento', value: 'monitoring_interference'},
    {label: 'Não parou no ponto de apoio', value: 'did_not_stop_at_the_support_point'},
  ];


  getValueByLabel(label: string): string | undefined {
    const incident = this.incidentTypes.find(item => item.label === label);
    return incident ? incident.value : undefined;
  }


  @ViewChild('moldura') molduraElement!: ElementRef;
  maxCharactersPerLine: number;




  ngAfterViewInit() {
    this.adjustMaxCharacters();
  }

  // Recalcular a largura ao redimensionar a janela
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.adjustMaxCharacters();
  }

  adjustMaxCharacters() {
    if (this.molduraElement) {
      const molduraWidth = this.molduraElement.nativeElement.clientWidth;
      let averageCharWidth = 7; // Default for viewing

      // Check if the page is in print mode
      if (window.matchMedia && window.matchMedia('print').matches) {
        averageCharWidth = 5.5; // Set for print mode
      }
      this.maxCharactersPerLine = Math.floor(molduraWidth / averageCharWidth);
    }
  }

  getFormattedInformation(): string[] {
    const info = this.incident.additionalInformation || '';
    const words = info.split(' ');
    const lines: string[] = [];
    let line = '';

    words.forEach(word => {
      if ((line + word).length <= this.maxCharactersPerLine) {
        line += (line ? ' ' : '') + word;
      } else {
        lines.push(line);
        line = word;
      }
    });

    if (line) {
      lines.push(line);
    }

    return lines;
  }


  get incidentType():string{
    const type = this.incident.incidentType.type

    return type
  }

  get trackerId(): string{
    return this.incident.vehicleTrackers[0]?.trackerId ?? '';
  }

  get trackerModel(): string{
    return this.incident.vehicleTrackers[0]?.trackerModel.name ?? '';
  }

  get trackerName(): string{
    return this.incident.vehicleTrackers[0]?.trackerModel?.trackerTechnology.name ?? '';
  }

  get origin(): string {
    return this.incident.monitoringRequest.travelSteps[0]?.address ?? '';
  }

  get destination(): string {
    const lastIndex = this.incident.monitoringRequest.travelSteps.length - 1;
    const lastStep = this.incident.monitoringRequest.travelSteps[lastIndex];

    return lastStep?.address ?? '';
  }

  get trackerTechnologyName(): string {
    return this.incident.monitoringRequest.truck.vehicle.trackers?.[0]?.trackerModel.trackerTechnology.name ?? '';
  }

  // get trackerId(): string {
  //   return this.incident.monitoringRequest.truck.vehicle.trackers?.[0]?.trackerId ?? '';
  // } #hmn*

  get firstWagonPlate(): string {
    return this.incident.monitoringRequest.wagons[0]?.vehicle.plate ?? '';
  }

  get secondWagonPlate(): string {
    return this.incident.monitoringRequest.wagons[1]?.vehicle.plate ?? '';
  }


  workingSituation(e): string {
    if (e == 'third_party') {
      return 'Terceiro'
    }
    if (e == 'fleet') {
      return 'Empregado'
    }
    if (e == 'aggregate') {
      return 'Agregado'
    }

  }

  protected readonly getLocaleFirstDayOfWeek = getLocaleFirstDayOfWeek;
}
