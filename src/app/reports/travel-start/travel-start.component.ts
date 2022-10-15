import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-travel-start',
  templateUrl: './travel-start.component.html',
  styleUrls: ['./travel-start.component.css']
})
export class TravelStartComponent implements OnInit {
  isLoading = false;

  constructor() { }

  ngOnInit(): void {
  }

}
