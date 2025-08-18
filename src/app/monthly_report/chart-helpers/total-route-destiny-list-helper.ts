import { Injectable } from '@angular/core';
import { MonthlyReport } from '../monthly_report.service';

export interface SmRouteDestinyItem {
  label: string;
  total: number;
  percentage: number;
}

@Injectable({
  providedIn: 'root'
})
export class SmRouteDestinyListHelper {

  constructor() {}

  build(report: MonthlyReport): SmRouteDestinyItem[] {
    try {
      const data = JSON.parse(report.totalSmPerRouteDestiny || '{}');
      const list: SmRouteDestinyItem[] = Object.entries(data).map(([label, obj]: [string, any]) => ({
        label,
        total: obj.Total || 0,
        percentage: obj['Porcentagem (%)'] || 0
      }));

      // Ordenar decrescente pelo total e pegar os top 10
      return list.sort((a, b) => b.total - a.total).slice(0, 5);
    } catch {
      return [];
    }
  }
}
