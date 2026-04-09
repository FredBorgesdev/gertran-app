import { Injectable } from '@angular/core';
import { SearchTotalItem } from './total-search-percent.helper';

export interface SearchItem {
  label: string;
  total: number;
  percentage: number;
}

@Injectable({
  providedIn: 'root'
})
export class SearchListHelper {
  private colors = [
    '#FFA726', '#AB47BC', '#FF7043', '#9CCC65',
    '#EC407A', '#26C6DA', '#26A69A', '#FFCA28',
    '#5C6BC0', '#D4E157', '#42A5F5', '#EF5350', 
    '#8D6E63', '#78909C', '#1C5FC5', '#66BB6A', 
  ];

  constructor() {}

  build(data: any): (SearchItem & { color: string })[] {
    try {
      // const data = JSON.parse(totalSearchPercent || '{}')[0]; // pega o primeiro objeto
      if (!data) return [];
      // console.log(data)

      const values: SearchTotalItem[] = [
        { label: 'Consultas', value: data.total_consultas || 0, color: this.colors[0] },
        { label: 'Pesquisas', value: data.total_pesquisas || 0, color: this.colors[1] },
        { label: 'Vitimologias', value: data.total_vitimologias || 0, color: this.colors[2] },
      ];

      const total = values.reduce((sum, v) => sum + v.value, 0) || 1;

      const list = values.map((v, i) => ({
        label: v.label,
        total: v.value,
        percentage: (v.value / total) * 100,
        color: v.color || this.colors[i % this.colors.length]
      }));

      return list.sort((a, b) => b.total - a.total);
    } catch {
      return [];
    }
  }
}
