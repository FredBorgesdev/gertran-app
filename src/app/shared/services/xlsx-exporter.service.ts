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
}
