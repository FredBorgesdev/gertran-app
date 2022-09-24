import { Component, Input } from '@angular/core';
import {Subject} from 'rxjs';
import {Tracker} from '../trackers.service';

@Component({
  selector: 'app-trackers-tab',
  templateUrl: './trackers-tab.component.html',
  styleUrls: ['./trackers-tab.component.css']
})
export class TrackersTabComponent {
  @Input() vehicleId: string;

  tracker: Tracker = null;
  refreshTrackers = new Subject<void>();

  isCreatingTracker = false;

  constructor() { }

  closeFormAndRefreshList(): void {
    this.isCreatingTracker = false;
    this.refreshTrackers.next();
  }

  setTrackerAndOpenForm(tracker?: Tracker): void {
    if (tracker) {
      this.tracker = tracker;
    }
    this.isCreatingTracker = true;
  }

  closeForm(): void {
    this.isCreatingTracker = false;
    this.tracker = null;
  }
}
