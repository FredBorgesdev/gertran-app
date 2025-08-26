import { Injectable } from '@angular/core';

export interface NcOverSpeedDriverItem {
  motorista: string;
  total: number;
}

@Injectable({ providedIn: 'root' })
export class NcOverSpeedDriverListHelper {
  constructor() {}

  build(ncPerDriver: string): NcOverSpeedDriverItem[] {
    try {
      const data = JSON.parse(ncPerDriver || '{}');
      return Object.keys(data)
        .map((motorista) => {
          const ncs = data[motorista].ncs || {};
          const excesso = ncs['Excesso de velocidade'] || 0;
          return {
            motorista,
            total: excesso,
          };
        })
        .filter((item) => item.total > 0)
        .sort((a, b) => b.total - a.total) // ordena do maior para o menor
        .slice(0,5); // só motoristas que têm excesso de velocidade
    } catch {
      return [];
    }
  }
}
