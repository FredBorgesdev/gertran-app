import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import ApiService, {Choice, DEFAULT_LIMIT, GetAllResponse, Pagination} from '../shared/services/api.service';
import {Observable} from 'rxjs';
import {format} from 'date-fns';

export interface Operations {
  broker: {
    id: string;
    name: string;
  };
  id: string;
  name: string;
  policyEffectiveDate: string;
  allowedTrackerModels: {
    id: string;
    name: string;
  }[];
  allowedTruckTypes: {
    id: string;
    name: string;
  }[];
  allowedWagonTypes: {
    id: string;
    name: string;
  }[];
  authorizeAutomaticMonitoring: false;
  brokerName: string;
  brokerPersonInCharge: string;
  brokerPhone: string;
  customer: string;
  followMonitoring: string;
  insuranceCompany: {
    id: string;
    name: string;
  };
  isDdr: boolean;
  isMain: boolean;
  operationType: string;
  radiusToActivateRouteDeviation: number;
  requiredPeripherals: {
    id: string;
    name: string;
  }[];
  driverWorkingSituationAggregate: boolean;
  driverWorkingSituationFleet: boolean;
  driverWorkingSituationThirdParty: boolean;
  forbiddenStateDriverThirdParty: String;
  forbiddenCityDriverThirdParty: String;
  quantityReleasedTravelsThirdParty: number;
  allowedTrafficStartTime: String;
  allowedTrafficEndTime: String;
  maximumPriceValueThirdParty: String;
  minimumPriceValueThirdParty: String;
}

@Injectable({
  providedIn: 'root'
})
export class OperationsService implements ApiService<Operations> {

  constructor(
    private http: HttpClient,
  ) {
  }

  getAll(
    pagination: Pagination,
    filters?: {
      customer?: string;
      name?: string;
    }
  ): Observable<GetAllResponse<Operations>> {
    const params: any = {limit: pagination.limit || DEFAULT_LIMIT};
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }
    if (filters?.customer) {
      params.customer = filters.customer;
    }
    if (filters?.name) {
      params.name = filters.name;
    }
    if(window.location.pathname.includes('customers/customers')
    ){
      const currentUrl = window.location.href;
      const urlParts = currentUrl.split('/');
      const uuid = urlParts[urlParts.length - 1];
      params.customer = uuid;
    }
    
    return this.http.get<GetAllResponse<Operations>>('settings/operations', {params});
  }

  get(id: string): Observable<Operations> {
    return this.http.get<Operations>(`settings/operations/${id}`);
  }

  save(operations: Omit<Operations, 'id'>): Observable<Operations> {
    if(operations.maximumPriceValueThirdParty!=null)
      operations.maximumPriceValueThirdParty = operations.maximumPriceValueThirdParty.replace('R$ ', '').replace(/\./g, '').replace(',', '.');
    if(operations.minimumPriceValueThirdParty!=null)
      operations.minimumPriceValueThirdParty = operations.minimumPriceValueThirdParty.replace('R$ ', '').replace(/\./g, '').replace(',', '.');
    if(operations.allowedTrafficStartTime!=null)
      operations.allowedTrafficStartTime = format(new Date(operations.allowedTrafficStartTime.toString()), 'HH:mm');
    if(operations.allowedTrafficEndTime!=null)
      operations.allowedTrafficEndTime = format(new Date(operations.allowedTrafficEndTime.toString()), 'HH:mm');
    
    operations.policyEffectiveDate = format(new Date(operations.policyEffectiveDate), 'yyyy-MM-dd');
    return this.http.post<Operations>('settings/operations/create', operations);
  }

  update(
    id: string,
    operations: Omit<Operations, 'id'>
  ): Observable<Operations> {
    if(operations.maximumPriceValueThirdParty!=null)
      operations.maximumPriceValueThirdParty = operations.maximumPriceValueThirdParty.replace('R$ ', '').replace(/\./g, '').replace(',', '.');
    if(operations.minimumPriceValueThirdParty!=null)
      operations.minimumPriceValueThirdParty = operations.minimumPriceValueThirdParty.replace('R$ ', '').replace(/\./g, '').replace(',', '.');
    if(operations.allowedTrafficStartTime!=null)
      operations.allowedTrafficStartTime = format(new Date(operations.allowedTrafficStartTime.toString()), 'HH:mm');
    if(operations.allowedTrafficEndTime!=null)
      operations.allowedTrafficEndTime = format(new Date(operations.allowedTrafficEndTime.toString()), 'HH:mm');
    
    return this.http.patch<Operations>(`settings/operations/${id}/update`, operations);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`settings/operations/${id}/delete`);
  }

  getOperationTypes(): Observable<Choice[]> {
    return this.http.get<Choice[]>('settings/operations/operation-types');
  }
}

