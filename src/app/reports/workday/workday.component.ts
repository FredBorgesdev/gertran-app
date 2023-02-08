import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workday',
  templateUrl: './workday.component.html',
  styleUrls: ['./workday.component.css']
})
export class WorkdayComponent implements OnInit {
  isLoading = false;
  workdayRows = [];

  constructor() { }

  ngOnInit(): void {
  }

  generateReport(...args): void {}
}
