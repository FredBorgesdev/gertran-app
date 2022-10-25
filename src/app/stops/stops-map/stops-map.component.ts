import {Component, Input, OnInit} from '@angular/core';
import {Stop} from '../stops.service';

@Component({
  selector: 'app-stops-map',
  templateUrl: './stops-map.component.html',
  styleUrls: ['./stops-map.component.css']
})
export class StopsMapComponent implements OnInit {
  @Input() stop: Stop;

  constructor() { }

  ngOnInit(): void {
  }
}
