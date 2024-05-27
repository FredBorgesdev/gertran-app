import {Component, Input} from '@angular/core';
import {Incident} from "../incidents.service";
import {getLocaleFirstDayOfWeek} from "@angular/common";

@Component({
  selector: 'app-incident-details-modal',
  templateUrl: './incident-details-modal.component.html',
  styleUrls: ['./incident-details-modal.component.css']
})
export class IncidentDetailsModalComponent {
  @Input() incident: Incident;
  @Input() blank: boolean = false;

  printConfig = {
    printMode: 'template-popup',
    popupProperties: 'toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,fullscreen=yes',
    pageTitle: '',
    styles: [
      'td { padding: 5px !important; }',
      // Styles copied from antd implementation
      '.ant-checkbox-inner::after { position: absolute !important; display: table !important; border: 2px solid #3f87f5 !important; border-top: 0 !important; border-left: 0 !important; transform: rotate(45deg) scale(1) translate(-50%,-50%) !important; opacity: 1 !important; transition: all .2s cubic-bezier(.12,.4,.29,1.46) .1s !important; content: \' \' !important; }',
      '.ant-descriptions-item-label.ng-star-inserted { font-weight: bold; }',
      '* { font-size: 10px; }',
    ],
  };

  constructor() {
  }

  get origin(): string {
    return this.incident.monitoringRequest.travelSteps[0]?.address ?? '';
  }

  get destination(): string {
    const lastIndex = this.incident.monitoringRequest.travelSteps.length - 1;
    const lastStep = this.incident.monitoringRequest.travelSteps[lastIndex];

    return lastStep?.address ?? '';
  }

  get trackerTechnologyName(): string {
    return this.incident.monitoringRequest.truck.vehicle.trackers?.[0]?.trackerModel.trackerTechnology.name ?? '';
  }

  get trackerId(): string {
    return this.incident.monitoringRequest.truck.vehicle.trackers?.[0]?.trackerId ?? '';
  }

  get firstWagonPlate(): string {
    return this.incident.monitoringRequest.wagons[0]?.vehicle.plate ?? '';
  }

  get secondWagonPlate(): string {
    return this.incident.monitoringRequest.wagons[1]?.vehicle.plate ?? '';
  }

  protected readonly getLocaleFirstDayOfWeek = getLocaleFirstDayOfWeek;
}
