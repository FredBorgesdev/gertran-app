import { Injectable } from '@angular/core';
import { MonthlyReport } from '../monthly_report.service';

export interface NcIncidentItem {
  label: string;
  total: number;
  percentage: number;
}

@Injectable({
  providedIn: 'root'
})
export class NcIncidentListHelper {

  constructor() {}

  build(report: MonthlyReport): NcIncidentItem[] {
    try {
      const data = JSON.parse(report.totalNcPerIncidentPercent || '{}');
      const list: NcIncidentItem[] = Object.entries(data).map(([label, obj]: [string, any]) => ({
        label,
        total: obj.Total || 0,
        percentage: obj['Porcentagem (%)'] || 0
      }));

      // Ordenar decrescente pelo total
      return list.sort((a, b) => b.total - a.total).slice(0,5);
    } catch {
      return [];
    }
  }
}
