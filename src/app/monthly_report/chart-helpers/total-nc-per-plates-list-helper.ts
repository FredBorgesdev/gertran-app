import { Injectable } from '@angular/core';
import { MonthlyReport } from '../monthly_report.service';

export interface NcPerPlatesItem {
  label: string;
  total: number;
  percentage: number;
}

@Injectable({ providedIn: 'root' })
export class NcPerPlatesListHelper {
  private colors = [
    '#42A5F5', '#66BB6A', '#FFA726', '#AB47BC',
    '#EC407A', '#26C6DA', '#FF7043', '#9CCC65',
    '#5C6BC0', '#D4E157', '#26A69A', '#FFCA28',
    '#8D6E63', '#78909C', '#EF5350'
  ];

  build(report: MonthlyReport): (NcPerPlatesItem & { color: string })[] {
    try {
      const data = JSON.parse(report.totalNcPerPlatesPercent || '{}');
      const list: (NcPerPlatesItem & { color: string })[] =
        Object.entries(data).map(([label, obj]: [string, any], index) => ({
          label,
          total: obj.Total || 0,
          percentage: obj['Porcentagem (%)'] || 0,
          color: this.colors[index % this.colors.length]
        }));

      return list.sort((a, b) => b.total - a.total).slice(0, 5);
    } catch {
      return [];
    }
  }
}
