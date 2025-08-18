import { Injectable } from '@angular/core';
import { MonthlyReport } from '../monthly_report.service';

export interface SmPerOperationsItem {
  label: string;
  total: number;
  percentage: number;
}

@Injectable({
  providedIn: 'root'
})
export class SmPerOperationsListHelper {

  constructor() {}

  build(report: MonthlyReport): SmPerOperationsItem[] {
    try {
      const data = JSON.parse(report.totalSmPerOperationsPercent || '{}');

      const list: SmPerOperationsItem[] = Object.entries(data).map(([label, obj]: [string, any]) => ({
        label,
        total: obj.Total || 0,
        percentage: obj['Porcentagem (%)'] || 0
      }));

      // Ordenar decrescente pelo total e limitar a 15 itens
      return list.sort((a, b) => b.total - a.total).slice(0, 5);
    } catch {
      return [];
    }
  }
}
