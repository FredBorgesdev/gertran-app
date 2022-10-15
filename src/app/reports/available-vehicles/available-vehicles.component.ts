import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-available-vehicles',
  templateUrl: './available-vehicles.component.html',
  styleUrls: ['./available-vehicles.component.css']
})
export class AvailableVehiclesComponent implements OnInit {
  isLoading = false;

  constructor() { }

  ngOnInit(): void {
  }

}
