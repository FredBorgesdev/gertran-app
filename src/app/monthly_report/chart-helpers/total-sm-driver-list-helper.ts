import { Injectable } from '@angular/core';
import { MonthlyReport } from '../monthly_report.service';

export interface SmDriverItem {
  Motorista: string;
  VeiculoAutomotor: string;
  QuantidadeDeViagens: number;
}

@Injectable({
  providedIn: 'root'
})
export class SmDriverListHelper {

  constructor() {}

  build(report: MonthlyReport): SmDriverItem[] {
    try {
      const data = JSON.parse(report.totalSmPerDriver || '[]');
      return data.map((item: any) => ({
        Motorista: item.Motorista,
        VeiculoAutomotor: item['Veiculo Automotor'],
        QuantidadeDeViagens: item['Quantidade de Viagens']
      })).slice(0, 10);
    } catch {
      return [];
    }
  }
}
