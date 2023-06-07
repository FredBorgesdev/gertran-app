import {Component, OnInit} from '@angular/core';
import {CustomerFilter} from '../filters/base-customer-filter/base-customer-filter.component';
import {MonitoringRequestBait, ReportsService} from '../reports.service';

@Component({
  selector: 'app-baits',
  templateUrl: './baits.component.html',
  styleUrls: ['./baits.component.css']
})
export class BaitsComponent implements OnInit {
  isLoading = false;
  monitoringRequestsBaits: MonitoringRequestBait[] = [];

  constructor(
    private reportService: ReportsService
  ) {
  }

  ngOnInit(): void {
  }

  generateReport(form: CustomerFilter): void {
    this.isLoading = true;
    this.reportService.getBaits(form).subscribe((monitoringRequestBaits) => {
      this.monitoringRequestsBaits = monitoringRequestBaits;
      this.isLoading = false;
    });
  }
}
