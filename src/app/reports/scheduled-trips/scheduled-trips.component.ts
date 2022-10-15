import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scheduled-trips',
  templateUrl: './scheduled-trips.component.html',
  styleUrls: ['./scheduled-trips.component.css']
})
export class ScheduledTripsComponent implements OnInit {
  isLoading = false;

  constructor() { }

  ngOnInit(): void {
  }

}
