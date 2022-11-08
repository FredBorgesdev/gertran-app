import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';

export type Command = {
  code: string;
  description: string;
};

@Injectable({
  providedIn: 'root'
})
export class CommandsService {
  constructor(private http: HttpClient) { }

  getCommands(
    trackerModel: string,
  ): Observable<Command[]> {
    const params = new HttpParams({
      fromObject: { tracker_model: trackerModel },
    });

    return this.http.get<Command[]>('trackers/commands/list', { params });
  }

  requestCommand(body: {
    trackerSerialNumber: string;
    trackerModel: string;
    code: string;
  }): Observable<any> {
    return this.http.post('trackers/commands/request', body);
  }
}
