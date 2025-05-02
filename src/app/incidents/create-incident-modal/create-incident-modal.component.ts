import {Component, Input, OnInit} from '@angular/core';
import {Choice} from '../../shared/services/api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BaseCrudFormComponent} from '../../base-crud/base-crud-form/base-crud-form.component';
import {Incident, IncidentsService} from '../../monitoring/incidents.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ActivatedRoute} from '@angular/router';
import {MonitoringRequests} from '../../monitoring-requests/monitoring-requests.service';
import {googlePlacesOptions} from "../../shared/data/google-places-options";
import {AddressSelectComponent} from "../../shared/address-select/address-select.component";

@Component({
  selector: 'app-create-incident-modal',
  templateUrl: './create-incident-modal.component.html',
  styleUrls: ['./create-incident-modal.component.css']
})
export class CreateIncidentModalComponent extends BaseCrudFormComponent<Incident> implements OnInit {
  // @Input() monitoringRequest: MonitoringRequests & {
  //   driverName: string;
  //   driverPhone: string;
  // };

  googlePlacesOptions = googlePlacesOptions;

  @Input() blank: boolean = false;
  @Input() monitoringRequest: any;
  @Input() driver: {
    name: string;
    phone: string;
  };


  procedure1String: string;
  procedure2String: string;
  procedure3String: string;
  procedure4String: string;
  procedure5String: string;
  procedure6String: string;
  procedure7String: string;

  constructor(
    private formBuilder: FormBuilder,
    service: IncidentsService,
    message: NzMessageService,
    activatedRoute: ActivatedRoute,
  ) {
    super(
      service,
      message,
      activatedRoute,
    );
  }

  incidentTypes: Choice[] = [
    {label: 'Desvio de rota', value: 'route_detour'},
    {label: 'Retido em posto fiscal', value: 'apprehension_of_inspection_fee'},
    {label: 'Botão de pânico', value: 'panic_button'},
    {label: 'Perda de sinal', value: 'signal_loss'},
    {label: 'Violação de sensor', value: 'sensor_violation_alert'},
    {label: 'Problema Mecânico/Eletrico', value: 'mechanical_issue'},
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
    // {label: 'Evento teste', value: 'incident_test'},
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
  validateForm: FormGroup;


  ngOnInit(): void {
    if(!this.blank){
      this.validateForm = this.formBuilder.group({
        monitoringRequest: [this.monitoringRequest.id],
        incidentType: [null],
        incidentDate: [null],
        incidentLocation: [null],
        driverContactedAt: [null],
        driverName: [this.driver?.name],
        driverPhone: [this.driver?.phone],
        shipperName: [null, [Validators.required]],
        shipperContactedAt: [null, [Validators.required]],
        wasImmediateActionApproved: [null],
        immediateActionResponsibleName: [null],
        immediateActionTakenAt: [null],
        wasFederalPoliceActionNeeded: [null],
        federalPoliceActionResponsibleName: [null],
        federalPoliceActionTakenAt: [null],
        additionalInformation: [null],
        optionalEmail: [null],
        incidentLatitude: [null],
        incidentLongitude: [null],
        incidentDatetime: [null],
        procedure1 :[null],
        procedure2 :[null],
        procedure3 :[null],
        procedure4:[null],
        procedure5 :[null],
        procedure6 :[null],
        procedure7 :[null],
      });
    }else{
      this.validateForm = this.formBuilder.group({
        monitoringRequest: [this.monitoringRequest?.id], 
        incidentType: [null],
        incidentDate: [new Date()], 
        incidentLocation: ['\u200B'],
        driverContactedAt: [new Date()], 
        driverName: [this.driver?.name], 
        driverPhone: [this.driver?.phone], 
        shipperName: ['\u200B', [Validators.required]], 
        shipperContactedAt: [new Date(), [Validators.required]],
        wasImmediateActionApproved: [false], 
        immediateActionResponsibleName: ['\u200B'],
        immediateActionTakenAt: [new Date()], 
        wasFederalPoliceActionNeeded: [false], 
        federalPoliceActionResponsibleName: ['\u200B'],
        federalPoliceActionTakenAt: [new Date()], 
        additionalInformation: [null],
        optionalEmail: [null],
        incidentLatitude: [0.0], 
        incidentLongitude: [0.0], 
        incidentDatetime: [new Date()],
        procedure1 :[null],
        procedure2 :[null],
        procedure3 :[null],
        procedure4: [null],
        procedure5 :[null],
        procedure6 :[null],
        procedure7 :[null],
      });
    }
    
    this.validateForm.get('incidentType')?.valueChanges.subscribe(value => {
      this.onIncidentTypeChange(value);
    });
  }
  
  // Método que será chamado quando o tipo de incidente mudar
// Método que será chamado quando o tipo de incidente mudar
onIncidentTypeChange(type: any): void {
  // const proceduresMap: Record<string, { procedure1: string; procedure2: string; procedure3: string; procedure4: string; procedure5: string; procedure6: string }> = {
  //   panic_button: {
  //     procedure1: 'Pedido de posição',
  //     procedure2: 'Comando de bloqueio',
  //     procedure3: 'Contato com o motorista',
  //     procedure4: 'Contato com o transportador',
  //     procedure5: 'Acionamento de PRF',
  //     procedure6: 'Pronta resposta',
  //   },
  //   route_detour: {
  //     procedure1: 'Pedido de posição',
  //     procedure2: 'Contato com o motorista',
  //     procedure3: 'Contato com o transportador',
  //     procedure4: 'Acionamento PRF',
  //     procedure5: 'Pronta resposta',
  //     procedure6: 'Comando de bloqueio',
  //   },
  //   convoy_detour:{
  //     procedure1: 'Pedido de posição',
  //     procedure2: 'Contato com o motorista',
  //     procedure3: 'Contato com o transportador',
  //     procedure4: 'Acionamento PRF',
  //     procedure5: 'Pronta resposta',
  //     procedure6: 'Comando de bloqueio',
  //   },
  //   signal_loss: {
  //     procedure1: 'Pedido de posição',
  //     procedure2: 'Comando de bloqueio',
  //     procedure3: 'Contato com o motorista',
  //     procedure4: 'Contato com o transportador',
  //     procedure5: 'Acionamento PRF',
  //     procedure6: 'Pronta resposta',
  //   },
  //   sensor_violation_alert:{
  //     procedure1: 'Pedido de posição',
  //     procedure2: 'Comando de bloqueio',
  //     procedure3: 'Contato com o motorista',
  //     procedure4: 'Contato com o transportador',
  //     procedure5: 'Acionamento PRF',
  //     procedure6: 'Pronta resposta',
  //   },
  //   mechanical_issue: {
  //     procedure1: 'Contato com o motorista para avaliação das condições do local, e informar o nome e contato da oficina mecânica',
  //     procedure2: 'Avaliação das condições do local onde está sendo realizado o reparo para verificação do nível de segurança',
  //     procedure3: 'Contato com transportador',
  //     procedure4: 'Pronta resposta',
  //     procedure5: null,
  //     procedure6: null
  //   },
  //   vehicle_under_maintenance:{
  //     procedure1: 'Contato com o motorista para avaliação das condições do local, e informar o nome e contato da oficina mecânica',
  //     procedure2: 'Avaliação das condições do local aonde está sendo realizado o reparo para a verificação do nível de segurança',
  //     procedure3: 'Contato com transportador',
  //     procedure4: 'Pronta resposta',
  //     procedure5: null,
  //     procedure6: null
  //   },
  //   stop_without_notify:{
  //     procedure1: 'Comando bloqueio',
  //     procedure2: 'Contato com o motorista',
  //     procedure3: 'Contato com transportador',
  //     procedure4: 'Acionamento de PRF',
  //     procedure5: 'Pronta resposta',
  //     procedure6: null
  //   },
  //   restart_traveling_without_notify:{
  //     procedure1: 'Contato com o motorista',
  //     procedure2: 'Envio de mensagem de advertência',
  //     procedure3: 'Comando de bloqueio (caso parado)',
  //     procedure4: 'Contato com transportador',
  //     procedure5: 'Autorização de início/ reinicio após envio de mensagem',
  //     procedure6: null
  //   },
  //   technical_assistance:{
  //     procedure1: 'Contato com o motorista informando para se dirigir a local seguro e informar parada',
  //     procedure2: 'Envio de mensagem de advertência',
  //     procedure3: 'Comando de bloqueio (caso parado)',
  //     procedure4: 'Contato com transportador',
  //     procedure5: 'Autorização de início/ reinicio após envio de mensagem',
  //     procedure6: null
  //   },
  //   // Adicione mais tipos de incidentes e procedimentos aqui conforme necessário
  // };

  // // Recupera os procedimentos do mapa ou define como null se o tipo de incidente não estiver no mapa
  // const selectedProcedures = proceduresMap[type] || {
  //   procedure1: null,
  //   procedure2: null,
  //   procedure3: null,
  //   procedure4: null,
  //   procedure5: null,
  //   procedure6: null,
  // };

  // // Atribui os valores aos procedimentos
  this.procedure1String = "1° Tratativa";
  this.procedure2String = "2° Tratativa";
  this.procedure3String = "3° Tratativa";
  this.procedure4String = "4° Tratativa";
  this.procedure5String = "5° Tratativa";
  this.procedure6String = "6° Tratativa";
  this.procedure7String = "7° Tratativa";
}


  
  handleAddressChange(nominatimAddress: any): void {
    const latitude = Number(nominatimAddress.lat).toFixed(6);
    const longitude = Number(nominatimAddress.lon).toFixed(6);
    const formattedAddress = AddressSelectComponent.enhanceOutputAddress(nominatimAddress.displayName);

    this.validateForm.patchValue({
      incidentLocation: formattedAddress,
      incidentLatitude: latitude,
      incidentLongitude: longitude,
    });
  }

}
