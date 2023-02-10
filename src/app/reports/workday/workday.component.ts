import { Component, OnInit } from '@angular/core';
import {BaseWorkdayFilter} from '../reports.service';

@Component({
  selector: 'app-workday',
  templateUrl: './workday.component.html',
  styleUrls: ['./workday.component.css']
})
export class WorkdayComponent implements OnInit {
  isLoading = false;
  workdayRows = [
    {
      id: '1',
      startedAt: '2021-01-01 00:00:00',
      status: 'IN_PROGRESS',
      driver: {
        name: 'John Doe',
      },
      vehicle: {
        id: '1',
      },
      customer: {
        tradingName: 'John Doe',
      },
      positionEvent: {
        eventName: 'START',
        eventDescription: 'Start of the workday',
      }
    }
  ];
  reportFormat = 'synthetic';

  constructor() { }

  ngOnInit(): void {
  }

  generateReport(...args): void {}

  valueChanges(params: BaseWorkdayFilter): void {
    this.reportFormat = params.reportFormat;
  }
}
