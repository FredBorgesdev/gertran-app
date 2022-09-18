import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import {Wagon, WagonsService} from '../wagons.service';

@Component({
  selector: 'app-wagons-wagon',
  templateUrl: './wagons-wagon.component.html',
  styleUrls: ['./wagons-wagon.component.css']
})
export class WagonsWagonComponent implements OnInit {
  wagon: Wagon = null;
  isLoading = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: NzMessageService,
    private service: WagonsService,
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.paramMap.has('id')) {
      this.loadWagon();
    }
  }

  loadWagon(): void {
    this.isLoading = true;
    const id = this.activatedRoute.snapshot.params.id;
    this.service.get(id).subscribe(data => {
      this.wagon = data;
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
      this.messageService.error('Erro ao carregar o carreta');
    });
  }
}
