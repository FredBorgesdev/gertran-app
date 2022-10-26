import {Component, Input, OnInit} from '@angular/core';
import {Position} from '../positions.service';

@Component({
  selector: 'app-monitoring-event-modal',
  templateUrl: './monitoring-event-modal.component.html',
  styleUrls: ['./monitoring-event-modal.component.css']
})
export class MonitoringEventModalComponent implements OnInit {
  @Input() automations: Position['automations'];

  constructor() { }

  ngOnInit(): void {
  }

}
