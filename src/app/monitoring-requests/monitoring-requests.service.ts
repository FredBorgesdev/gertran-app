import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import ApiService, {Choice, DEFAULT_LIMIT, GetAllResponse, Pagination} from '../shared/services/api.service';
import {Observable} from 'rxjs';
import {Invoice} from './invoices.service';
import {Customer} from '../customers/customers.service';
import {Truck} from '../trucks/trucks.service';
import {Position} from '../monitoring/positions.service';
import {ArmedGuard} from './armed-guard.service';
import {Bait} from './baits.service';
import {Terminals} from '../terminals/terminals.service';
import {Checklist} from '../checklists/checklists.service';
import {SharedOperationsItem} from "../customers/shared-operations.service";

export enum Status {
  DRAFT = 'draft',
  UNDER_REVIEW = 'under_review',
  WAITING_FOR_START = 'waiting_for_start',
  IN_PROGRESS = 'in_progress',
  REPROVED = 'reproved',
  FINISHED = 'finished',
  SUCCESSFULLY_TERMINATED = 'successfully_terminated',
  CANCELED = 'canceled',
  UNSUCCESSFULLY_TERMINATED = 'unsuccessfully_terminated',
  TERMINATED_DISAPPROVED = 'terminated_disapproved',
  POTENTIALLY_STOLEN = 'potentially_stolen',
  STOLEN_CONFIRMED = 'stolen_confirmed',
  PENDING = 'pending',
  IMPORTED_UNAVAILABLE = 'imported_unavailable',
}

export interface ChecklistSet{
  reviewedAt: string;
  status: string;
}

export interface MonitoringRequests {
  sentAt: any;
  checklistSet: ChecklistSet[];
  checklistReleased: ChecklistSet;
  releasedAt: string;
  publishedAt: string;
  createdAt: string;
  loadingOrders: {
    id: string;
    ocrNumber: string;
  }[];
  terminal: Terminals | null;
  baits: Bait[];
  armedGuards: ArmedGuard[];
  loadType: string;
  observations: string;
  updatedAt: string;
  lastPosition: Position;
  customer: Customer;
  loadValue: number;
  invoices: Invoice[];
  travelStatus: string;
  hasEmbeddedIntelligence: boolean;
  hasMacro: boolean;
  surveyConductedBy: string;
  loadDescription: string;
  id: string;
  name: string;
  route: string;
  status: Status;
  shipper: Customer;
  transporter: Customer;
  driver: {
    workingSituation: string;
    id: string;
    name: string;
    phoneNumber: string;
    cpf: string;
    cnhNumber: string;
    rg: string;
    cnhValidity:string;
    cnhCategory: string;
  };
  auxiliaryDriver: {
    workingSituation: string;
    id: string;
    name: string;
    phoneNumber: string;
    cpf: string;
    cnhNumber: string;
  };
  truck: Truck;
  wagons: {
    id: string;
    vehicle: {
      id: string;
      plate: string;
    }
  }[];
  filteredWagons: {
    id: string;
    vehicle: {
      id: string;
      plate: string;
    }
  }[];
  operation: {
    id: string;
    name: string;
  };
  sharedOperation: SharedOperationsItem;
  routeCoordinates: any[];
  travelSteps: any[];
  checklist: Checklist;
  checklistBait: {
    positionChecked: boolean;
    batteriesChecked: boolean;
    relationChecked: boolean;
    jammingChecked: boolean;
    decouplingChecked: boolean;
    timerChecked: boolean;
    positionFrequencyChecked: boolean;
    batteryLevel: string;
    timerIntervalInMinutes: string;
    approved: boolean;
    justification: string;
  };
  ocrNumber: string;
  user:{
    id:any,
    name:any
  };
  trackerTechnology: {
    id: string;
    name: string;
  };
  operationType: string;
  branchOffice?: {tradingName:string};
}



export type PossibleStatus = {
  [key: string]: {
    label: string; value: Status
  }[]
};

@Injectable({
  providedIn: 'root'
})
export class MonitoringRequestsService implements ApiService<MonitoringRequests> {

  constructor(
    private http: HttpClient,
  ) {
  }

  getAll(pagination: Pagination, filters?: {
    status?: string;
    fromDate?: string;
    toDate?: string;
    customer?: string;
    plate?: string;
  }): Observable<GetAllResponse<MonitoringRequests>> {
    if(window.location.pathname == '/reports/dashboards/tc2' || 
    window.location.pathname == '/reports/dashboards/client' ||
    window.location.pathname == '/reports/dashboards/tc-gertran' 
    )
      pagination.limit = 3

    if(window.location.pathname == '/reports/dashboards/tc3')
      pagination.limit = 5

    const params: any = {limit: pagination.limit || DEFAULT_LIMIT};
    if (pagination.url) {
      new URL(pagination.url).searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    if (filters?.fromDate) {
      params.from_date = filters.fromDate.split('T')[0];
    }

    if (filters?.toDate) {
      const date = new Date(filters.toDate);
      date.setDate(date.getDate() + 1);
      params.to_date = date.toISOString().split('T')[0];
    }

    if (filters?.customer) {
      params.customer = filters.customer;
    }

    if (filters?.status) {
      params.status = filters.status;
    }

    if (filters?.plate) {
      params.plate = filters.plate;
    }

    return this.http.get<GetAllResponse<MonitoringRequests>>('monitoring/monitoring-requests', {params});
  }

  get(id: string): Observable<MonitoringRequests> {
    return this.http.get<MonitoringRequests>(`monitoring/monitoring-requests/${id}`);
  }

  save(monitoringRequests: Partial<MonitoringRequests>): Observable<MonitoringRequests> {
    return this.http.post<MonitoringRequests>('monitoring/monitoring-requests/create', monitoringRequests);
  }

  update(
    id: string,
    monitoringRequests: Omit<MonitoringRequests, 'id'>
  ): Observable<MonitoringRequests> {
    return this.http.patch<MonitoringRequests>(`monitoring/monitoring-requests/${id}/update`, monitoringRequests);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`monitoring/monitoring-requests/${id}/delete`);
  }

  send(id: string): Observable<void> {
    return this.http.post<void>(`monitoring/monitoring-requests/${id}/send`, {});
  }

  release(
    id: string,
    monitoringRequests: Omit<MonitoringRequests, 'id'>
  ): Observable<MonitoringRequests> {
    return this.http.patch<MonitoringRequests>(`monitoring/monitoring-requests/${id}/release`, monitoringRequests);
  }

  getSurveyConductors(): Observable<Choice[]> {
    return this.http.get<Choice[]>('monitoring/survey-conductors');
  }

  get possibleStatus(): PossibleStatus {
    return {
      [Status.DRAFT]: [
        {label: 'Em análise', value: Status.UNDER_REVIEW},
      ],
      [Status.UNDER_REVIEW]: [
        {label: 'Iniciar viagem', value: Status.IN_PROGRESS},
        // {label: 'Liberar', value: Status.WAITING_FOR_START},
        {label: 'Cancelar', value: Status.CANCELED},
        {label: 'Reprovar', value: Status.REPROVED},
        {label: 'Finalizar viagem', value: Status.FINISHED},
      ],
      [Status.WAITING_FOR_START]: [
        {label: 'Iniciar viagem', value: Status.IN_PROGRESS},
        {label: 'Finalizar viagem', value: Status.FINISHED},
      ],
      [Status.IN_PROGRESS]: [
        {label: 'Finalizar viagem', value: Status.FINISHED},
      ],
      [Status.REPROVED]: [
        {label: 'Solicitar Reavaliação', value: Status.UNDER_REVIEW},
        {label: 'Finalizar viagem', value: Status.FINISHED},
      ],
      [Status.FINISHED]: [
        {label: 'Em andamento', value: Status.IN_PROGRESS},
      ]
    };
  }
}

