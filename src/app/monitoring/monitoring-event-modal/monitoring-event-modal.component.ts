import {Component, Input, OnInit} from '@angular/core';
import {Position} from '../positions.service';
import {Automation, AutomationsService} from '../../automations/automations.service';

@Component({
  selector: 'app-monitoring-event-modal',
  templateUrl: './monitoring-event-modal.component.html',
  styleUrls: ['./monitoring-event-modal.component.css']
})
export class MonitoringEventModalComponent implements OnInit {
  @Input() plate: Position['vehiclePlate'];

  automations: Automation[] = [];

  constructor(
    private automationsService: AutomationsService,
  ) {
  }

  ngOnInit(): void {
    this.automationsService.getAutomationsByPlate(this.plate).subscribe(automations => {
      this.automations = automations.results;
    });
  }

  getAutomationType(automation: string): string {
    return {
      blocked_vehicle_moving: 'Veículo bloqueado em movimento',
      extended_vehicle_stop: 'Veículo parado por muito tempo',
      finish_traveling_without_notify: 'Finalizar viagem sem notificar',
      leave_point_without_notify: 'Sair do ponto sem notificar',
      mechanical_issue: 'Problema mecânico',
      out_of_temperature_vehicle: 'Veículo fora da temperatura',
      panic_button: 'Botão de pânico',
      recurrent_active_buser: 'Buser ativo recorrente',
      restart_traveling_without_notify: 'Reiniciar viagem sem notificar',
      route_detour: 'Desvio de rota',
      signal_loss: 'Perda de sinal',
      speeding: 'Excesso de velocidade',
      start_traveling_without_notify: 'Iniciar viagem sem notificar',
      stop_duration: 'Duração da parada',
      stop_without_notify: 'Parada sem notificar',
      violation_alert: 'Alerta de infração'
    }[automation];
  }

  getCommandsSent(commandSentHistory: any): string {
    return commandSentHistory.map(command => command.code).join(', ');
  }
}
