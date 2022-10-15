import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-travel-requests',
  templateUrl: './travel-requests.component.html',
  styleUrls: ['./travel-requests.component.css']
})
export class TravelRequestsComponent implements OnInit {
  isLoading = false;

  constructor() { }

  ngOnInit(): void {
  }

}
