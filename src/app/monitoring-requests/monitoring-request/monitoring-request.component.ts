import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monitoring-request',
  templateUrl: './monitoring-request.component.html',
  styleUrls: ['./monitoring-request.component.css']
})
export class MonitoringRequestComponent implements OnInit {
  isLoading = false;
  resource = null;

  constructor() { }

  ngOnInit(): void {
  }

}
