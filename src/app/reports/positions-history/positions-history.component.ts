import {Component, OnInit} from '@angular/core';
import {BaseVehicleFilter, CommandSentHistory, ReportsService} from '../reports.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Position} from '../../monitoring/positions.service';
import {format} from "date-fns";

@Component({
  selector: 'app-positions-history',
  templateUrl: './positions-history.component.html',
  styleUrls: ['./positions-history.component.css']
})
export class PositionsHistoryComponent implements OnInit {
  isLoading = false;
  positions: Position[] = [];

  constructor(
    private reportsService: ReportsService,
    private message: NzMessageService,
  ) {
  }

  ngOnInit(): void {
  }

  generateReport(form: BaseVehicleFilter): void {
    this.isLoading = true;
    this.reportsService.getTrackingPositionsHistory(form).subscribe((positions) => {
      this.positions = positions;
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
      this.message.error('Ocorreu um erro ao gerar o relatório');
    });
  }

  get xlsxValues(): any[] {
    return this.positions.map((position) => ({
      Data: format(new Date(position.positionDate), 'dd/MM/yyyy HH:mm:ss'),
      Latitude: position.latitude,
      Longitude: position.longitude,
      Referencia: position.pointReference,
      Localizacao: position.street,
      Ignição: position.ignition ? 'Ligada' : 'Desligada',
      'Velocidade (km/h)': position.speed,
    }));
  }
}
