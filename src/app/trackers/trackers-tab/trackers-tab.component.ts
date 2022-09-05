import { Component, Input, OnInit } from '@angular/core';
import { Tracker } from '../trackers-form/trackers-form.component';

@Component({
  selector: 'app-trackers-tab',
  templateUrl: './trackers-tab.component.html',
  styleUrls: ['./trackers-tab.component.css']
})
export class TrackersTabComponent implements OnInit {

  @Input() trackers: Tracker[] = null

  tracker: any = null
  isCreatingTracker = false

  constructor() { }

  ngOnInit(): void {
    console.log(this.trackers)
  }

  saveTracker(tracker: Tracker) {
    this.isCreatingTracker = false
  }

  editTracker(tracker: Tracker) {
    this.tracker = tracker
    this.isCreatingTracker = true
  }

  closeTrackerForm() {
    this.isCreatingTracker = false
    this.tracker = null
  }

}
