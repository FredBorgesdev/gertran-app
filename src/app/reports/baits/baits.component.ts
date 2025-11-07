import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
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
    private reportService: ReportsService,
    private cdRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
  }

  generateReport(form: CustomerFilter): void {
    this.isLoading = true;
    this.reportService.getBaits(form).subscribe({
      next: (monitoringRequestBaits) => {
        this.monitoringRequestsBaits = monitoringRequestBaits;
        this.isLoading = false;
        
        // setTimeout(0) para garantir que o CD rode DEPOIS que a função subscribe() terminar
        setTimeout(() => {
             this.cdRef.detectChanges();
        }, 0); 
      },
      error: (err) => {
        console.error('Erro ao gerar relatório de iscas:', err);
        this.isLoading = false;
        
        // Garante que o spinner de erro pare também
        setTimeout(() => {
             this.cdRef.detectChanges();
        }, 0);
      }
    });
  }
}
