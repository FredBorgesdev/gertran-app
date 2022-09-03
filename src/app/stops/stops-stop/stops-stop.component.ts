import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stops-stop',
  templateUrl: './stops-stop.component.html',
  styleUrls: ['./stops-stop.component.css']
})
export class StopsStopComponent implements OnInit {
  isLoading = false
  stop: any

  constructor() { }

  ngOnInit(): void {
  }

}
