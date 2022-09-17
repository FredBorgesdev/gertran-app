import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { wagonsList } from '../wagons-list/mocked-data';
import {Wagon} from '../wagons.service';

@Component({
  selector: 'app-wagons-wagon',
  templateUrl: './wagons-wagon.component.html',
  styleUrls: ['./wagons-wagon.component.css']
})
export class WagonsWagonComponent implements OnInit {

  wagon: Wagon = null;
  isLoading = false;

  wagonsList = wagonsList;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: NzMessageService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.snapshot.paramMap.has('id') ? this.loadWagon() : this.createNewWagon();
  }

  loadWagon() {
    const id = this.activatedRoute.snapshot.params.id;
    this.wagon = this.wagonsList.find(wagon => wagon.id === id);
  }

  createNewWagon() {
    this.wagon = {
      id: null,
      name: '',
      brand: '',
      model: '',
      year: null,
      color: '',
      plate: '',
      trackers: []
    };
  }

  save() {
    this.isLoading = true;
    setTimeout(
      () => {
        this.isLoading = false;
        this.messageService.success('Dados salvos com sucesso!');
      } , 333);
  }
}
