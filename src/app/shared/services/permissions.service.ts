import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GetAllResponse} from './api.service';

interface Permission {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<GetAllResponse<Permission>> {
    const params = { limit: 50 };
    return this.http.get<GetAllResponse<Permission>>('permissions', { params });
  }
}
