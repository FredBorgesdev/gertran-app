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

  build(totalSmPerDriver): SmDriverItem[] {
    try {
      const data = JSON.parse(totalSmPerDriver || '[]');
      return data.map((item: any) => ({
        Motorista: item.Motorista,
        VeiculoAutomotor: item['Veiculo Automotor'],
        QuantidadeDeViagens: item['Quantidade de Viagens']
      })).slice(0, 5);
    } catch {
      return [];
    }
  }
}
