import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-monitoring-event-modal',
  templateUrl: './monitoring-event-modal.component.html',
  styleUrls: ['./monitoring-event-modal.component.css']
})
export class MonitoringEventModalComponent implements OnInit {
  @Input() name: string;

  constructor() { }

  ngOnInit(): void {
  }

}
