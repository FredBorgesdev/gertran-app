import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

export type Message = {
  code: string;
  description: string;
};

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  constructor(private http: HttpClient) { }

  getMessages(
    trackerModel: string,
  ): Observable<Message[]> {
    const params = new HttpParams({
      fromObject: { tracker_model: trackerModel },
    });

    return this.http.get<Message[]>('trackers/macros/list', { params });
  }

  requestMessage(body: {
    trackerSerialNumber: string;
    trackerModel: string;
    code: string | number;
    message: string;
  }): Observable<any> {
    return this.http.post('trackers/macros/request', body);
  }
}
