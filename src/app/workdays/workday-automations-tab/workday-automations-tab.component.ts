import {Component, Input, OnInit} from '@angular/core';
import {Customer} from '../../customers/customers.service';

@Component({
  selector: 'app-workday-automations-tab',
  templateUrl: './workday-automations-tab.component.html',
  styleUrls: ['./workday-automations-tab.component.css']
})
export class WorkdayAutomationsTabComponent implements OnInit {
  @Input() customer: Customer;

  isCreatingAutomation = false;
  isLoading = false;

  constructor() { }

  ngOnInit(): void {
  }

}
