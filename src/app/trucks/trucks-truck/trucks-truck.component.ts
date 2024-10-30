import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import {TrucksService} from '../trucks.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-trucks-truck',
  templateUrl: './trucks-truck.component.html',
  styleUrls: ['./trucks-truck.component.css']
})
export class TrucksTruckComponent implements OnInit {
  truck = null;
  isLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private message: NzMessageService,
    private service: TrucksService,
    public authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.paramMap.has('id')) {
      if (this.activatedRoute.snapshot.paramMap.get('customer_id') != '') {
        this.authService.setCustomer(this.activatedRoute.snapshot.paramMap.get('customer_id'));
      }
      this.loadTruck();
    }
  }

  loadTruck(): void {
    this.isLoading = true;
    this.service.get(this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe(data => {
        this.truck = data;
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
        this.message.error('Erro ao carregar o registro. Tente novamente.');
      });
  }
}
