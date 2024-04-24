import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Choice} from '../../shared/services/api.service';
import {AddressSelectComponent} from "../../shared/address-select/address-select.component";

@Component({
  selector: 'app-occurrence-form',
  templateUrl: './occurrence-form.component.html',
  styleUrls: ['./occurrence-form.component.css']
})
export class OccurenceFormComponent implements OnInit {

  validateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { 

    this.validateForm = new FormGroup({
    });

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
    {label: 'Evento teste', value: 'incident_test'},
    {label: 'Outro', value: 'others'},
    {label: 'Furto', value: 'theft'},
    {label: 'Não condizente com as regras', value: 'non_compliance_with_rules'},
    {label: 'Sem solicitação de monitoramento', value: 'without_monitoring_request'},
    {label: 'Parada prolongada', value: 'extended_stop'},
    {label: 'Acidente com terceiros', value: 'accident_with_third_party'},
    {label: 'Excesso de velocidade', value: 'speeding'},
    {label: 'Possivel ação de jammer', value: 'possible_jammer_action'},
    {label: 'Retirada do espelhamento', value: 'mirroring_removal'},
    {label: 'Atraso inicio de viagem', value: 'delay_start_of_traveling'},
    {label: 'Inicio de viagem sem informar', value: 'start_traveling_without_notify'},
    {label: 'Fim de viagem sem informar', value: 'finish_traveling_without_notify'},
    {label: 'Ausencia no inicio de mensagem (macro)', value: 'failure_to_send_message_or_macro'},
    {label: 'Falha no espelhamento', value: 'mirror_failure'},
    {label: 'Interferencia no monitoramento', value: 'monitoring_interference'},
    {label: 'Não parou no ponto de apoio', value: 'did_not_stop_at_the_support_point'},
  ];

  ngOnInit(): void {}
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