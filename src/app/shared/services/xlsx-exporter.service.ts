import { Injectable } from '@angular/core';
import { utils, writeFile } from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class XlsxExporterService {

  constructor() { }

    generate(fileName: string, rows: any[]): void {
    const ws = utils.json_to_sheet(rows);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Sheet1');

    writeFile(wb, `${fileName}.xlsx`);
  }

  generate2(fileName: string, rows: any[][]): void {
    const ws = utils.aoa_to_sheet(rows);

    // Determinar o número máximo de colunas em todas as linhas
    const maxCols = Math.max(...rows.map(row => row.length));

    // Calcular largura para cada coluna com base em todas as linhas
    const colWidths = Array.from({ length: maxCols }).map((_, colIndex) => {
      const colValues = rows.map(row => {
        const val = row[colIndex];
        return val != null ? String(val) : '';
      });
      const maxLength = Math.max(...colValues.map(val => val.length));
      return { wch: maxLength + 2 }; // margem
    });

    ws['!cols'] = colWidths;

    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Sheet1');

    writeFile(wb, `${fileName}.xlsx`);
  }
}
