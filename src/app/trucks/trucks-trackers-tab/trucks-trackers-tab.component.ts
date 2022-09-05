import { Component, Input, OnInit } from '@angular/core';
import { Truck, TruckTracker } from '../trucks-list/trucks-list.component';

@Component({
  selector: 'app-trucks-trackers-tab',
  templateUrl: './trucks-trackers-tab.component.html',
  styleUrls: ['./trucks-trackers-tab.component.css']
})
export class TrucksTrackersTabComponent implements OnInit {

  @Input() truck: Truck

  tracker: any = null
  isCreatingTracker = false

  constructor() { }

  ngOnInit(): void {
    console.log(this.truck)
  }

  saveTracker(tracker: TruckTracker) {
    this.isCreatingTracker = false
  }

  editTracker(tracker: TruckTracker) {
    this.tracker = tracker
    this.isCreatingTracker = true
  }

  closeTrackerForm() {
    this.isCreatingTracker = false
    this.tracker = null
  }

}
