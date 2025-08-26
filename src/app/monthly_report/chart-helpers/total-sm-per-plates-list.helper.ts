import { Injectable } from '@angular/core';
import { MonthlyReport } from '../monthly_report.service';

export interface SmPerPlatePercentItem {
  placa: string;
  total: number;
  percentage: number;
}

@Injectable({
  providedIn: 'root'
})
export class TotalSmPerPlatesPercentListHelper {

  build(report: MonthlyReport): SmPerPlatePercentItem[] {
    if (!report.totalSmPerPlatesPercent) return [];

    const smPerPlates = typeof report.totalSmPerPlatesPercent === 'string'
      ? JSON.parse(report.totalSmPerPlatesPercent)
      : report.totalSmPerPlatesPercent;

    return Object.entries(smPerPlates).map(([placa, value]: any) => ({
      placa,
      total: value.Total,
      percentage: value["Porcentagem (%)"]
    }))
    .sort((a, b) => b.total - a.total) // ordena por total desc
    .slice(0, 10); // top 10
  }
}
