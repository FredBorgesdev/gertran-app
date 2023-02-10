import {Component, Input, OnInit} from '@angular/core';
import {Customer} from '../../customers/customers.service';
import {WorkdayAutomations} from '../workday-automations.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-workday-automations-tab',
  templateUrl: './workday-automations-tab.component.html',
  styleUrls: ['./workday-automations-tab.component.css']
})
export class WorkdayAutomationsTabComponent {
  @Input() customer: Customer;

  isCreatingAutomation = false;
  isLoading = false;
  resource: WorkdayAutomations;
  refreshWorkdayAutomations = new Subject<void>();

  edit(workdayAutomation: WorkdayAutomations): void {
    this.isCreatingAutomation = true;
    this.resource = workdayAutomation;
  }

  success(): void {
    this.isCreatingAutomation = false;
    this.resource = null;
    this.refreshWorkdayAutomations.next();
  }
}
