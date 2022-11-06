import { Component, OnInit } from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {MacroVehicleReport, ReportsService} from '../reports.service';

@Component({
  selector: 'app-macrovehicle',
  templateUrl: './macrovehicle.component.html',
  styleUrls: ['./macrovehicle.component.css']
})
export class MacrovehicleComponent implements OnInit {
  isLoading = false;
  macroVehicleHistory: MacroVehicleReport[];

  constructor(
    private reportsService: ReportsService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
  }

  generateReport(form: any): void {
    this.isLoading = true;
    this.reportsService.getMacroVehicleReport(form).subscribe((response) => {
      this.isLoading = false;
      this.macroVehicleHistory = response;
    }, () => {
      this.isLoading = false;
      this.message.error('Erro ao gerar relatório');
    });
  }
}
