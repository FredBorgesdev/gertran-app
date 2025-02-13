import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators"; 

export interface TerminalPlates {
  terminal: string;
  plates: string[];
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TerminalPlatesService {
  constructor(private http: HttpClient) {}

  get(): Observable<TerminalPlates[]> {
    return this.http.get<string>(`monitoring/monitoring-requests-released-alerts/get-plates-out-grid`).pipe(map((rawData: string) => {
        const terminals: TerminalPlates[] = [];
        let currentTerminal: TerminalPlates | null = null;

        rawData.split('\n').forEach((line) => {
          if (line.startsWith('Terminal:')) {
            if (currentTerminal) {
              terminals.push(currentTerminal);
            }
            currentTerminal = { terminal: line.replace('Terminal: ', ''), plates: [] };
          } else if (currentTerminal) {
            currentTerminal.plates.push(line);
          }
        });

        if (currentTerminal) {
          terminals.push(currentTerminal);
        }
        return terminals;
      })
    );
  }
}
