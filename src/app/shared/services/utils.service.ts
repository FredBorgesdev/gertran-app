import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor() { }

  removeNullValues(object: any): any {
    const copy = { ...object };

    Object.keys(object).forEach(key => {
      if (object[key] && typeof object[key] === 'object') {
        this.removeNullValues(object[key]);
      } else if (object[key] == null) {
        delete copy[key];
      }
    });

    return copy;
  }
}
