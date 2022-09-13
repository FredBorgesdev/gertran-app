import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { stopsList } from '../stops-list/mocked-data';
import { Stop } from '../stops-list/stops-list.component';

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

  loadStop() {
    this.stop = stopsList.find(stop => stop.id === Number(this.route.snapshot.paramMap.get('id')));
  }

  createNewStop() {
    this.stop = {
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
