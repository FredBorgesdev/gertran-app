import {MonitoringRequests} from './monitoring-requests.service';
import {Wagon} from '../wagons/wagons.service';
import {TravelStep} from './travel-step.service';


class MonitoringRequest {
  constructor(public data: MonitoringRequests) {
  }

  get wagonPlates(): string {
    return this.data.wagons?.map(wagon => (wagon as Wagon).vehicle.plate).join(', ') ?? '';
  }

  get localizedWorkingSituations(): {
    [key in 'fleet' | 'aggregate' | 'third_party']: string;
  } {
    return {
      fleet: 'Frota',
      aggregate: 'Agregado',
      third_party: 'Terceiro',
    };
  }

  get driverWorkingSituation(): string {
    return this.localizedWorkingSituations[this.data.driver?.workingSituation];
  }

  get auxiliaryDriverWorkingSituation(): string {
    return this.localizedWorkingSituations[this.data.auxiliaryDriver?.workingSituation];
  }

  get loadType(): string {
    return {
      refrigerated: 'Refrigerada',
      unrefrigerated: 'Não refrigerada',
      frozen: 'Congelada',
    }[this.data.loadType] || 'N/a';
  }

  get ocrNumber(): string {
    return this.data.loadingOrders?.map(loadingOrder => loadingOrder.ocrNumber).join(', ') || 'N/a';
  }

  get firstTravelStep(): TravelStep {
    return this.data.travelSteps?.[0];
  }

  get firstTravelStepDate(): Date {
    if (!this.firstTravelStep) {
      return new Date();
    }
    return new Date(this.firstTravelStep?.date + ' ' + this.firstTravelStep?.time);
  }

  get lastTravelStep(): TravelStep {
    return this.data.travelSteps?.[this.data.travelSteps.length - 1];
  }

  get lastTravelStepDate(): Date {
    if (!this.lastTravelStep) {
      return new Date();
    }
    return new Date(this.lastTravelStep?.date + ' ' + this.lastTravelStep?.time);
  }
}

export default MonitoringRequest;
