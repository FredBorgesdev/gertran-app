import {GetAllResponse} from '../services/api.service';
import {BehaviorSubject, Observable} from 'rxjs';

class EmptyGetAllResponseFactory {
  static create<T = any>(): Observable<GetAllResponse<T>> {
    return new BehaviorSubject<GetAllResponse<T>>({
      results: [],
      count: 0,
      next: null,
      previous: null,
      limit: 0,
      offset: 0,
    });
  }
}

export default EmptyGetAllResponseFactory;
