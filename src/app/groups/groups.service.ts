import { Injectable } from '@angular/core';

export interface Group {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor() { }
}
