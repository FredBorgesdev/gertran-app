import { Component, Input, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { GetAllResponse, getCurrentPage } from '../../shared/services/api.service';
import { Position } from '../positions.service';
import { Automation, AutomationsService } from '../../automations/automations.service';

@Component({
  selector: 'app-monitoring-event-modal',
  templateUrl: './monitoring-event-modal.component.html',
  styleUrls: ['./monitoring-event-modal.component.css']
})
export class MonitoringEventModalComponent implements OnInit {
  @Input() terminal: string;
  @Input() plate: string;

  automations: GetAllResponse<Automation>;
  isLoading = false;

  constructor(private automationsService: AutomationsService) {}

  ngOnInit(): void {
    this.loadAutomations();
  }

  loadAutomations(url?: string): void {
    this.isLoading = true;
    this.automationsService
      .getAutomationsByPlate (this.plate, this.terminal, { url })
      .subscribe(
        (data) => {
          this.automations = data;
          this.isLoading = false;
        },
        () => (this.isLoading = false)
      );
  }

  get page(): number {
    return getCurrentPage(this.automations);
  }

  handleQueryParamsChange(params: NzTableQueryParams): void {
    if (params.pageIndex < this.page) {
      const url = this.replaceOffsetWithPage(
        this.automations.previous,
        params.pageIndex
      );
      this.loadAutomations(url);
    } else if (params.pageIndex > this.page) {
      const url = this.replaceOffsetWithPage(
        this.automations.next,
        params.pageIndex
      );
      this.loadAutomations(url);
    }
  }

  replaceOffsetWithPage(url: string, page: number): string {
    const limit = +url.match(/limit=\d+/)[0].split('=')[1];
    return url.replace(/offset=\d+/, `offset=${limit * page - limit}`);
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
    return commandSentHistory.map((command) => command.code).join(', ');
  }
}
