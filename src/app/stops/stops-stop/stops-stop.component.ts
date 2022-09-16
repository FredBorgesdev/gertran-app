import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { stopsList } from '../stops-list/mocked-data';
import {Stop} from '../stops.service';

@Component({
  selector: 'app-stops-stop',
  templateUrl: './stops-stop.component.html',
  styleUrls: ['./stops-stop.component.css']
})
export class StopsStopComponent implements OnInit {
  isLoading = false;
  stop: Stop;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.route.snapshot.paramMap.has('id') ? this.loadStop() : this.createNewStop();
      this.isLoading = false;
    }, 333);
  }

  loadStop(): void {
    this.stop = stopsList.find(stop => stop.id === this.route.snapshot.paramMap.get('id'));
  }

  createNewStop(): void {
    this.stop = {
      id: null,
      name: '',
      description: '',
      address: '',
      radius: 0,
      typeId: 0,
      city: '',
      state: '',
      typeCategoryIds: []
    };
  }
}
