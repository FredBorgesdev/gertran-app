import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TransferChange, TransferItem} from 'ng-zorro-antd/transfer';
import { TrucksService } from 'src/app/trucks/trucks.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Customer } from '../customers.service';

@Component({
  selector: 'app-vehicles-charging-tab',
  templateUrl: './vehicles-charging-tab.component.html',
  styleUrls: ['./vehicles-charging-tab.component.css']
})
export class VehiclesChargingTab implements OnInit {
  list: TransferItem[] = [];
  selectedPermissions: number[] = [];

  @Output() save: EventEmitter<number[]> = new EventEmitter<number[]>();
  @Input() customer: Customer;

  constructor(
    private truckService: TrucksService,
    private activatedRoute: ActivatedRoute,
    public authService: AuthenticationService,

  ) { }

  ngOnInit(): void {

    console.log(this.activatedRoute.snapshot.paramMap.get('id'))

    if (this.activatedRoute.snapshot.paramMap.has('id')) {
      if (this.activatedRoute.snapshot.paramMap.get('customer_id') != '' || this.activatedRoute.snapshot.paramMap.get('customer_id') != null) {
        this.authService.setCustomer(this.activatedRoute.snapshot.paramMap.get('id'));


        this.truckService.getAllChargingMethod({limit: 10000}).subscribe(data => {
        this.list = data.results.map(item => ({
          id: item.id,
          title: item.vehicle.plate,
          direction: item.chargingMethod === 'monthly' ? 'right' : 'left'
        }));
      });    

      
      }

    }



  }

  change(transferChange: TransferChange): void {
    // this.selectedPermissions = transferChange.list
    //   .filter(item => item.direction === 'right')
    //   .map(item => item.id);
  }

  saveGroups(): void {
    // this.save.emit(this.selectedPermissions);
  }

}
