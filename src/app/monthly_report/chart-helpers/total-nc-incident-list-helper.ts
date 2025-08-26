import { Injectable } from '@angular/core';
import { MonthlyReport } from '../monthly_report.service';

export interface NcIncidentItem {
  label: string;
  total: number;
  percentage: number;
  color: string; // adiciona cor
}

@Injectable({
  providedIn: 'root'
})
export class NcIncidentListHelper {

  private colors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
    '#9966FF', '#FF9F40', '#C9CBCF', '#B0E57C',
    '#F45B69', '#8E44AD', '#3498DB'
  ];

  constructor() {}

  build(totalNcPerIncidentPercent): NcIncidentItem[] {
    try {
      const data = JSON.parse(totalNcPerIncidentPercent || '{}');
      const list: NcIncidentItem[] = Object.entries(data).map(([label, obj]: [string, any], index) => ({
        label,
        total: obj.Total || 0,
        percentage: obj['Porcentagem (%)'] || 0,
        color: this.colors[index % this.colors.length] // adiciona cor
      }));

      // Ordenar decrescente pelo total e limitar a 5 itens
      return list.sort((a, b) => b.total - a.total).slice(0, 5);
    } catch {
      return [];
    }
  }
}
