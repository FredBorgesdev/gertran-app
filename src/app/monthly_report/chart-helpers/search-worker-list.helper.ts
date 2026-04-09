import { Injectable } from '@angular/core';
import { WorkerTotalItem } from './search-worker-percent.helper';

export interface WorkerItem {
  label: string;
  total: number;
  percentage: number;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchWorkerListHelper {
  private colors = [
    '#FFA726', '#AB47BC', '#FF7043', '#9CCC65',
    '#EC407A', '#26C6DA', '#26A69A', '#FFCA28',
    '#5C6BC0', '#D4E157', '#42A5F5', '#EF5350', 
    '#8D6E63', '#78909C', '#1C5FC5', '#66BB6A',
  ];

  build(data: any): WorkerItem[] {
    if (!data) return [];

    const values: WorkerTotalItem[] = [
      { label: 'Agregado', value: data.agregado || 0, color: this.colors[0] },
      { label: 'Ajudante', value: data.ajudante || 0, color: this.colors[1] },
      { label: 'Ajudante Empregado', value: data.ajudante_empregado || 0, color: this.colors[2] },
      { label: 'Ajudante Terceiro', value: data.ajudante_terceiro || 0, color: this.colors[3] },
      { label: 'Empregado', value: data.empregado || 0, color: this.colors[4] },
      { label: 'Terceiro', value: data.terceiro || 0, color: this.colors[5] },
    ];

    const total = values.reduce((sum, v) => sum + v.value, 0) || 1;

    return values.map((v, i) => ({
      label: v.label,
      total: v.value,
      percentage: (v.value / total) * 100,
      color: v.color || this.colors[i % this.colors.length]
    })).sort((a, b) => b.total - a.total);
  }
}
