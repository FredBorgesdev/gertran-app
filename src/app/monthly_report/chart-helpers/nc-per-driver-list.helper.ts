import { Injectable } from '@angular/core';
import { MonthlyReport } from '../monthly_report.service';

export interface NcPerDriverItem {
  motorista: string;
  total: number;
  detalhes: { [key: string]: number };
}

@Injectable({
  providedIn: 'root'
})
export class NcPerDriverListHelper {

  build(totalNcPerDrivers): NcPerDriverItem[] {
    if (!totalNcPerDrivers) return [];

    const ncPerDrivers = typeof totalNcPerDrivers === 'string'
      ? JSON.parse(totalNcPerDrivers)
      : totalNcPerDrivers;

    return Object.entries(ncPerDrivers).map(([motorista, value]: any) => ({
      motorista,
      total: value.total,
      detalhes: value.ncs
    })).sort((a, b) => b.total - a.total).slice(0,8);
  }
}
