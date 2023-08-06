import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GetAllResponse} from '../shared/services/api.service';
import {MonitoringRequests} from '../monitoring-requests/monitoring-requests.service';
import {AbstractUser} from '../users/users.service';
import {Position} from '../monitoring/positions.service';
import {Workday} from '../workdays/workday.service';
import {Alert} from "../monitoring/alerts.service";

export interface BaseFilter {
  customer: string;
}

export interface BasePeriodFilter extends BaseFilter {
  from: string;
  to: string;
}

export interface BaseClosingFilter {
  from: string;
  to: string;
  closingDay: number;
}

export interface BaseUserFilter extends BasePeriodFilter {
  user: string;
}

export interface IncidentsFilter extends BaseVehicleFilter {
  includesByAutomation: boolean;
}

export interface LabelValue {
  label: string;
  value: number;
}

export interface BaseWorkdayFilter extends BasePeriodFilter {
  driver: string;
  reportFormat: string;
}

export interface BaseVehicleFilter extends BasePeriodFilter {
  plate: string;
}

export interface BaseMacroFilter extends BaseVehicleFilter {
  type?: string;
}

export interface DelayedTripFilter extends BaseFilter {
  plate: string;
  point?: string;
  internalCode?: string;
  invoice?: string;
}

export type ReportsResults = MonitoringRequests[];

export type CommandSentHistory = {
  apiReturn: any;
  code: string;
  commandParams: any;
  createdAt: string;
  deletedByCascade: boolean;
  id: string;
  observations: string;
  receivedAt: string;
  sentAt: string;
  sentByUser: AbstractUser;
  solvedAt: string;
  solvedByUser: AbstractUser;
  status: string;
  vehicleTracker: string;
};

export type PositionEvent = {
  eventCode: string;
  eventDescription: string;
  eventName: string;
  eventProcessed: boolean;
  eventType: string;
  id: string;
  createdAt: string;
  position: {
    vehicle: {
      id: string;
      plate: string;
    }
  }
};

export type MonitoringRequestBait = MonitoringRequests & {
  installationLocation: string;
  technology: string;
  serialNumber: string;
};

export type MacroVehicleReport = {
  id: string;
  direction: string;
  datetime: string;
  message: string;
  sentBy: string;
  status: string;
  title: string;
};

export type TrackerTechnology = {
  id: string;
  name: string;
};

export type TrackerModel = {
  id: string;
  trackerTechnology: TrackerTechnology;
  name: string;
};

export type Tracker = {
  id: string;
  trackerModel: TrackerModel;
  trackerId: string;
  isMain: boolean;
};

export type Vehicle = {
  id: string;
  plate: string;
  trackers: Tracker[];
};

export type Customer = {
  shippers: any[];
  id: string;
  checklistExpirationPeriod: string;
  isActive: boolean;
  cnpj: string;
  tradingName: string;
  corporateName: string;
  domain: string;
  email?: any;
  zipCode: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  latitude: string;
  longitude: string;
  maximumSpeedAllowed: number;
  canSelectShipper: boolean;
  isShipper: boolean;
  isSpecialOperation: boolean;
  isPamcary: boolean;
  branchOfficeOf?: any;
  permissions: any[];
};

export type ChecklistHistory = {
  origin: string;
  destiny: string;
  driver: {
    id: string;
    name: string;
    phoneNumber: string;
  };
  workingSituation: string;
  vehicle: Vehicle;
  customer: Customer;
  id: string;
  createdAt: Date;
  expirationDate: Date;
  driverDoorChecked: boolean;
  passengerDoorChecked: boolean;
  wagonEngagedChecked: boolean;
  panelSensorChecked: boolean;
  trunkChecked: boolean;
  sirenChecked: boolean;
  blockChecked: boolean;
  trunkLockChecked: boolean;
  justification: string;
  allowedTravel: boolean;
  generalJustification?: any;
  hasMacro: boolean;
  hasEmbeddedIntelligence: boolean;
  hasPendencies: boolean;
  embeddedIntelligenceJustification: string;
  reviewedAt: Date;
  status: string;
  requestedBy: {
    id: string;
    name: string;
  };
  reviewedBy?: any;
};

export type LogisticReport = {
  totalValue: string
  countByStatus: {
    canceled: LabelValue;
    draft: LabelValue;
    finished: LabelValue;
    importedUnavailable: LabelValue;
    inProgress: LabelValue;
    pending: LabelValue;
    reproved: LabelValue;
    successfullyTerminated: LabelValue;
    terminatedDisapproved: LabelValue;
    underReview: LabelValue;
    unsuccessfullyTerminated: LabelValue;
    waitingForStart: LabelValue;
  }
  countByTravelStatus: {
    contingency: LabelValue;
    driverInOvernight: LabelValue;
    inProgress: LabelValue;
    logisticManagement: LabelValue;
    none: LabelValue;
    priority: LabelValue;
    stopped: LabelValue;
    vehicleInCustomer: LabelValue;
    waitingForStart: LabelValue;
  }
  countByLoadType: {
    frozen: LabelValue;
    refrigerated: LabelValue;
    unrefrigerated: LabelValue;
  }
  lastPositions: {
    id: string
    latitude: number
    longitude: number
    temperature1: number
    speed: number
  }[]
  vehiclesCount: number;
  vehiclesTravellingCount: number;
  vehiclesOutOfServiceCount: number;
  monitoringRequestsFinishingWithin6Hours: any[];
};

export type FatigueReport = {
  eventType: number
  trackerSerialNumber: string
  latitude: number
  longitude: number
  eventId: number
  eventDatetime: string
  vehiclePlate: string
  driverName: string
  imageUrl: string
  speed: number
  level: any
};

export type IncidentReport = {
  id: string
  incidentType: {
    id: string
    type: string
    instructions: string
    requireTrackerAction: boolean
    requireDriverAction: boolean
    requireShipperAction: boolean
    requireImmediateAction: boolean
    requireFederalPoliceAction: boolean
    requireAdditionalInformation: boolean
    requireOptionalEmail: boolean
  }
  solvedBy: any
  wasAddedByAutomation: boolean
  datetime: string
  incidentDatetime: string
  incidentLocation: string
  incidentLatitude: number
  incidentLongitude: number
  driverName: string
  driverPhone: string
  driverContactedAt: any
  shipperName: string
  shipperContactedAt: any
  wasImmediateActionApproved: any
  immediateActionResponsibleName: any
  immediateActionTakenAt: any
  wasFederalPoliceActionNeeded: any
  federalPoliceActionResponsibleName: any
  federalPoliceActionTakenAt: any
  additionalInformation: any
  optionalEmail: any
  wasSolved: boolean
  createdBy: {
    id: string;
    name: string;
  }
};

export type AlertReport = Alert;

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) {
  }

  getLoadUnloadByPoint(filters: BasePeriodFilter): Observable<ReportsResults> {
    const params = new HttpParams({
      fromObject: {
        from_date: filters.from,
        to_date: filters.to,
        customer: filters.customer,
      }
    });
    return this.http.get<ReportsResults>('reports/monitoring/loadunloadbypoint?1=1', {params});
  }

  getDelayedTripes(filters: DelayedTripFilter): Observable<ReportsResults> {
    const params = new HttpParams({
      fromObject: {
        customer: filters.customer,
        plate: filters.plate,
        point: filters.point,
        internal_code: filters.internalCode,
        invoice: filters.invoice,
      }
    });
    return this.http.get<ReportsResults>('reports/monitoring/delayedtrips?1=1', {params});
  }

  getMonitoringRequests(filters: BasePeriodFilter): Observable<ReportsResults> {
    const fromObject: any = {
      from_date: filters.from,
      to_date: filters.to,
    };
    if (filters.customer) {
      fromObject.customer = filters.customer;
    }
    const params = new HttpParams({fromObject});
    return this.http.get<ReportsResults>('reports/monitoring/requests?1=1', {params});
  }

  getVehiclesReleased(filters: BasePeriodFilter): Observable<ReportsResults> {
    const params = new HttpParams({
      fromObject: {
        from_date: filters.from,
        to_date: filters.to,
        customer: filters.customer,
      }
    });
    return this.http.get<ReportsResults>('reports/monitoring/vehiclesreleased?1=1', {params});
  }

  getClosure(filters: BaseClosingFilter): Observable<ReportsResults> {
    const params = new HttpParams({
      fromObject: {
        from_date: filters.from,
        to_date: filters.to,
        closing_day: filters.closingDay,
      }
    });
    return this.http.get<ReportsResults>('reports/monitoring/closure?1=1', {params});
  }

  getTravelStart(filters: BaseVehicleFilter): Observable<PositionEvent[]> {
    const filtersParams: any = {
      from_date: filters.from,
      to_date: filters.to,
      customer: filters.customer,
    };
    if (filters.plate) {
      filtersParams.plate = filters.plate;
    }
    const params = new HttpParams({
      fromObject: filtersParams
    });
    return this.http.get<PositionEvent[]>('reports/monitoring/travelstart?1=1', {params});
  }

  getTravelEnd(filters: BaseVehicleFilter): Observable<PositionEvent[]> {
    const filtersParams: any = {
      from_date: filters.from,
      to_date: filters.to,
      customer: filters.customer,
    };
    if (filters.plate) {
      filtersParams.plate = filters.plate;
    }
    const params = new HttpParams({
      fromObject: filtersParams
    });
    return this.http.get<PositionEvent[]>('reports/monitoring/travelend?1=1', {params});
  }

  getTrackingCommandsHistory(filters: BaseVehicleFilter): Observable<CommandSentHistory[]> {
    const params = new HttpParams({
      fromObject: {
        from_date: filters.from,
        to_date: filters.to,
        customer: filters.customer,
        plate: filters.plate
      }
    });
    return this.http.get<CommandSentHistory[]>('reports/tracking/commandshistory?1=1', {params});
  }

  getTrackingPositionsHistory(filters: BaseVehicleFilter): Observable<Position[]> {
    const params = new HttpParams({
      fromObject: {
        from_date: filters.from,
        to_date: filters.to,
        customer: filters.customer,
        plate: filters.plate || 'AOU0G63'
      }
    });
    return this.http.get<Position[]>('reports/tracking/positionshistory?1=1', {params});
  }

  getBaits(filters: BasePeriodFilter): Observable<MonitoringRequestBait[]> {
    const params = new HttpParams({
      fromObject: {
        from_date: filters.from,
        to_date: filters.to,
        customer: filters.customer,
      }
    });
    return this.http.get<MonitoringRequestBait[]>('reports/events/bait?1=1', {params});
  }

  getOperationalAuditCommands(filters: BaseUserFilter): Observable<CommandSentHistory[]> {
    const params = new HttpParams({
      fromObject: {
        from_date: filters.from,
        to_date: filters.to,
        customer: filters.customer,
        user: filters.user,
      }
    });
    return this.http.get<CommandSentHistory[]>('reports/events/operationalauditcommands?1=1', {params});
  }

  getOperationalAuditMessages(filters: BaseUserFilter): Observable<CommandSentHistory[]> {
    const filtersParams: any = {
      from_date: filters.from,
      to_date: filters.to,
    };
    if (filters.user) {
      filtersParams.user = filters.user;
    }
    const params = new HttpParams({
      fromObject: filtersParams
    });
    return this.http.get<CommandSentHistory[]>('reports/events/operationalauditmessages?1=1', {params});
  }

  getMacroVehicleReport(form: BaseMacroFilter): Observable<MacroVehicleReport[]> {
    const filtersParams: any = {
      from_date: form.from,
      to_date: form.to,
      customer: form.customer,
    };
    if (form.plate) {
      filtersParams.plate = form.plate;
    }
    if (form.type) {
      filtersParams.type = form.type;
    }
    const params = new HttpParams({
      fromObject: filtersParams
    });

    return this.http.get<MacroVehicleReport[]>('reports/tracking/macrovehicle?1=1', {params});
  }

  getAnalyticalReport(form: BaseVehicleFilter): Observable<MacroVehicleReport[]> {
    const filtersParams: any = {
      from_date: form.from,
      to_date: form.to,
      customer: form.customer,
    };
    if (form.plate) {
      filtersParams.plate = form.plate;
    }
    const params = new HttpParams({
      fromObject: filtersParams
    });

    return this.http.get<MacroVehicleReport[]>('reports/events/analytical?1=1', {params});
  }

  getChecklistHistory(form: BaseVehicleFilter): Observable<ChecklistHistory[]> {
    const filtersParams: any = {
      from_date: form.from,
      to_date: form.to,
      customer: form.customer,
    };
    if (form.plate) {
      filtersParams.plate = form.plate;
    }
    const params = new HttpParams({
      fromObject: filtersParams
    });

    return this.http.get<ChecklistHistory[]>('reports/tracking/checklisthistory?1=1', {params});
  }

  getWorkdayHistoryAnalytical(form: BaseWorkdayFilter): Observable<Workday[]> {
    const params = new HttpParams({
      fromObject: {
        from_date: form.from,
        to_date: form.to,
        customer: form.customer,
        driver: form.driver,
      }
    });

    return this.http.get<Workday[]>('reports/workdays/analytical?1=1', {params});
  }

  getWorkdayHistorySynthetic(form: BaseWorkdayFilter): Observable<Workday[]> {
    const params = new HttpParams({
      fromObject: {
        from_date: form.from,
        to_date: form.to,
        customer: form.customer,
        driver: form.driver,
      }
    });

    return this.http.get<Workday[]>('reports/workdays/synthetic?1=1', {params});
  }

  getLogisticReport(form: Partial<BasePeriodFilter>): Observable<LogisticReport> {
    const filtersParams: any = {
      from_date: form.from,
      to_date: form.to,
    };
    if (form.customer) {
      filtersParams.customer = form.customer;
    }

    const params = new HttpParams({
      fromObject: filtersParams
    });

    return this.http.get<LogisticReport>('reports/monitoring/logisticssummary?1=1', {params});
  }

  getFatigueReport(form: BaseVehicleFilter): Observable<FatigueReport[]> {
    const params = new HttpParams({
      fromObject: {
        from_date: form.from,
        to_date: form.to,
        plate: form.plate,
      }
    });

    return this.http.get<FatigueReport[]>('reports/events/positiondriver?1=1', {params});
  }

  getIncidentsReport(form: IncidentsFilter): Observable<IncidentReport[]> {
    const fromObject: any = {
      from_date: form.from,
      to_date: form.to,
    };
    if (form.plate) {
      fromObject.plate = form.plate;
    }
    if (form.includesByAutomation) {
      fromObject.includes_by_automation = form.includesByAutomation;
    }
    if (form.customer) {
      fromObject.customer = form.customer;
    }
    const params = new HttpParams({
      fromObject
    });

    return this.http.get<IncidentReport[]>('reports/events/incidents?1=1', {params});
  }

  getPanicHistory(form: IncidentsFilter): Observable<IncidentReport[]> {
    const fromObject: any = {
      from_date: form.from,
      to_date: form.to,
    };
    if (form.plate) {
      fromObject.plate = form.plate;
    }
    if (form.customer) {
      fromObject.customer = form.customer;
    }
    const params = new HttpParams({
      fromObject
    });

    return this.http.get<IncidentReport[]>('reports/events/panichistory?1=1', {params});
  }

  getAlerts(form: IncidentsFilter): Observable<AlertReport[]> {
    const fromObject: any = {
      from_date: form.from,
      to_date: form.to,
    };
    if (form.plate) {
      fromObject.plate = form.plate;
    }
    if (form.customer) {
      fromObject.customer = form.customer;
    }
    const params = new HttpParams({
      fromObject
    });

    return this.http.get<AlertReport[]>('reports/tracking/alerts?1=1', {params});
  }
}
