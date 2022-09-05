import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Tracker } from '../trackers-form/trackers-form.component';

@Component({
  selector: 'app-trackers-table',
  templateUrl: './trackers-table.component.html',
  styleUrls: ['./trackers-table.component.css']
})
export class TrackersTableComponent implements OnInit {

  @Input() trackers: Tracker[]
  @Output() onEditTracker: EventEmitter<Tracker> = new EventEmitter<Tracker>()

  trackersOrderColumn = [
    {
      title: 'ID',
      compare: (a: Tracker, b: Tracker) => a.id - b.id,
    },
    {
      title: 'Sistema do rastreador',
      compare: (a: Tracker, b: Tracker) => a.trackingSystem.localeCompare(b.trackingSystem)
    },
    { title: 'Model do rastreador' },
    { title: 'Número de série' },
    { title: 'Principal' },
    { title: 'Ações' },
  ]

  constructor() { }

  ngOnInit(): void {
  }

  editTracker(tracker: Tracker) {
    this.onEditTracker.emit(tracker)
  }
}
