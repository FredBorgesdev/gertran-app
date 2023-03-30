import { Component, OnInit } from '@angular/core';
import {BaseVehicleFilter, FatigueReport, ReportsService} from '../reports.service';
import {NzMessageService} from 'ng-zorro-antd/message';


/*
{
  "event_type": 2,
  "tracker_serial_number": "31454515454",
  "latitude": -10.23252,
  "longitude": -11.23252,
  "event_id": 7845415,
  "event_datetime": "2023-03-24T10:00:00Z",
  "vehicle_plate": "abc5555",
  "driver_name": "João",
  "image_url": "https://img.itdg.com.br/tdg/images/recipes/000/031/593/318825/318825_original.jpg?mode=crop&width=710&height=400",
  "speed": 80,
  "level": null
}
 */

@Component({
  selector: 'app-fatigue-report',
  templateUrl: './fatigue-report.component.html',
  styleUrls: ['./fatigue-report.component.css']
})
export class FatigueReportComponent implements OnInit {
  isLoading = false;
  fatigueReport: FatigueReport[] = [];

  constructor(
    private reportsService: ReportsService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
  }

  generateReport(form: BaseVehicleFilter): void {
    this.isLoading = true;
    this.reportsService.getFatigueReport(form).subscribe((fatigueReport) => {
      this.fatigueReport = fatigueReport;
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
      this.message.error('Ocorreu um erro ao gerar o relatório');
    });
  }
}
