import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Stop, StopsService} from '../stops.service';

@Component({
  selector: 'app-stops-stop',
  templateUrl: './stops-stop.component.html',
  styleUrls: ['./stops-stop.component.css']
})
export class StopsStopComponent implements OnInit {
  isLoading = false;
  stop: Stop;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: StopsService,
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.paramMap.has('id')) {
      this.isLoading = true;
      const id = this.activatedRoute.snapshot.paramMap.get('id');

      this.service.get(id).subscribe(stop => {
        this.stop = stop;
        this.isLoading = false;
      });
    }
  }
}
