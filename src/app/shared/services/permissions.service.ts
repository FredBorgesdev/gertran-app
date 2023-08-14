import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GetAllResponse} from './api.service';

export interface Permission {
  id: number;
  name: string;
  codename: string;
}

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<GetAllResponse<Permission>> {
    const params = {limit: 999};
    return this.http.get<GetAllResponse<Permission>>('permissions', {params});
  }
}
