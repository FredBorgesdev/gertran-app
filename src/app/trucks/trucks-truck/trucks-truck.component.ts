import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { trucksList } from '../trucks-list/mocked-data';

@Component({
  selector: 'app-trucks-truck',
  templateUrl: './trucks-truck.component.html',
  styleUrls: ['./trucks-truck.component.css']
})
export class TrucksTruckComponent implements OnInit {

  truck = null;
  isLoading = false;

  trucksList = trucksList;

  constructor(
    private activatedRoute: ActivatedRoute,
    private messageService: NzMessageService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.snapshot.paramMap.has('id') ? this.loadTruck() : this.createNewTruck();
  }

  loadTruck() {
    this.isLoading = true;
    setTimeout(
      () => {
        this.isLoading = false;
        this.truck = this.trucksList.find(truck => truck.id === this.activatedRoute.snapshot.params.id);
      },
      666
    );
  }

  createNewTruck() {
    this.truck = {
      id: null,
      brand: '',
      model: '',
      year: null,
      color: '',
      plate: '',
      trackingSystem: '',
      trackingModel: '',
      trackingSerialNumber: ''
    };
  }

  save() {
    this.isLoading = true;
    setTimeout(
      () => {
        this.isLoading = false;
        this.messageService.success('As informações foram salvas com sucesso!');
      }, 666);
  }

}
