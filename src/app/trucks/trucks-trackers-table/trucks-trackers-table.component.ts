import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TruckTracker } from '../trucks-list/trucks-list.component';

@Component({
  selector: 'app-trucks-trackers-table',
  templateUrl: './trucks-trackers-table.component.html',
  styleUrls: ['./trucks-trackers-table.component.css']
})
export class TrucksTrackersTableComponent implements OnInit {

  @Input() trackers: TruckTracker[]
  @Output() onEditTracker: EventEmitter<TruckTracker> = new EventEmitter<TruckTracker>()

  trackersOrderColumn = [
    {
      title: 'ID',
      compare: (a: TruckTracker, b: TruckTracker) => a.id - b.id,
    },
    {
      title: 'Sistema do rastreador',
      compare: (a: TruckTracker, b: TruckTracker) => a.trackingSystem.localeCompare(b.trackingSystem)
    },
    { title: 'Model do rastreador' },
    { title: 'Número de série' },
    { title: 'Principal' },
    { title: 'Ações' },
  ]

  constructor() { }

  ngOnInit(): void {
  }

  editTracker(tracker: TruckTracker) {
    this.onEditTracker.emit(tracker)
  }
}
