import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {MacroVehicleReport, ReportsService} from '../reports.service';
import {ActivatedRoute} from "@angular/router";
import {format, subWeeks} from "date-fns";

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
    private message: NzMessageService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const {customerId, vehiclePlate} = params || {};

      if (!customerId || !vehiclePlate) {
        return;
      }

      const oneWeekAgo = subWeeks(new Date(), 1);
      this.generateReport({
        customer: customerId,
        from: format(oneWeekAgo, 'yyyy-MM-dd'),
        to: format(new Date(), 'yyyy-MM-dd'),
        plate: vehiclePlate
      });
    });
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
