import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TransferChange, TransferItem} from 'ng-zorro-antd/transfer';
import { TrucksChargingMethod, TrucksService } from 'src/app/trucks/trucks.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Customer } from '../customers.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-vehicles-charging-tab',
  templateUrl: './vehicles-charging-tab.component.html',
  styleUrls: ['./vehicles-charging-tab.component.css']
})
export class VehiclesChargingTab implements OnInit {
  list: TransferItem[] = [];
  selectedPermissions: number[] = [];

  monthlyVehicles: any;
  singleVehicles: any;
  customer: any;
  isLoading: boolean;
  constructor(
    private truckService: TrucksService,
    private activatedRoute: ActivatedRoute,
    public authService: AuthenticationService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    // if (!this.activatedRoute.snapshot.paramMap.has('id')) 
    //   return
    // if (this.activatedRoute.snapshot.paramMap.get('id') == '' 
    // || this.activatedRoute.snapshot.paramMap.get('id') == null) 
    //   return

    // this.customer = this.authService.setCustomer(this.activatedRoute.snapshot.paramMap.get('id'));

    // this.truckService.getAllChargingMethod({limit:100000}).subscribe(data => {
    //   this.list = data.results.map(item => ({
    //       id: item.id,
    //       title: item.vehicle.plate,
    //       direction: item.chargingMethod === 'monthly' ? 'right' : 'left'
    //   }));
    // });
  }

  change(transferChange: TransferChange): void {
    this.monthlyVehicles = transferChange.list
      .filter(item => item.direction === 'right')
      .map(item => item.id);

    this.singleVehicles = transferChange.list
      .filter(item => item.direction === 'left')
      .map(item => item.id);
  }

  saveGroups(): void {
    const monthly = this.list.filter(item => item.direction === 'right').map(item => item.id);
    const single = this.list.filter(item => item.direction === 'left').map(item => item.id);
    const payLoad : TrucksChargingMethod = { monthly, single, customer: this.activatedRoute.snapshot.paramMap.get('id') }
    this.truckService.setChargingMethod(payLoad).subscribe(
      () => this.handleSuccess(),
      () => this.handleFailure()
    )
  }

  private handleSuccess() {
    this.message.success('Salvo com sucesso');
    this.isLoading = false;
  }

  private handleFailure() {
    this.message.error('Ocorreu um erro ao salvar');
    this.isLoading = false;
  }
}