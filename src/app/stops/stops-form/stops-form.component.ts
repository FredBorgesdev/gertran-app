import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { TransferItem } from 'ng-zorro-antd/transfer';
import {Stop, StopsService} from '../stops.service';
import {BaseCrudFormComponent} from '../../base-crud/base-crud-form/base-crud-form.component';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Customer, CustomersService} from '../../customers/customers.service';

@Component({
  selector: 'app-stops-form',
  templateUrl: './stops-form.component.html',
  styleUrls: ['./stops-form.component.css']
})
export class StopsFormComponent extends BaseCrudFormComponent<Stop> implements OnInit {
  @Input() stop: Stop;

  stopTypes = [];
  customers: Customer[] = [];

  categoriesTransferItems: TransferItem[] = [];

  customersNextUrl: string;
  isLoadingMoreData: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private customersService: CustomersService,
    service: StopsService,
    message: NzMessageService,
    activatedRoute: ActivatedRoute
  ) {
    super(service, message, activatedRoute);
  }

  ngOnInit(): void {
    super.ngOnInit();

    (this.service as StopsService).getTypes().subscribe(types => {
      this.stopTypes = types;
    });

    this.loadMoreCustomers();
  }

  loadMoreCustomers(): void {
    this.isLoadingMoreData = true;
    this.customersService.getAll({
      limit: 999,
      url: this.customersNextUrl
    }).subscribe((customers) => {
      this.customersNextUrl = customers.next;
      this.customers = [...this.customers, ...customers.results];
      this.isLoadingMoreData = false;
    });
  }

  loadFormBuilder(): void {
    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      address: [null, [Validators.required]],
      radius: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      pointType: [null, [Validators.required]],
      latitude: [null, [Validators.required]],
      longitude: [null, [Validators.required]],
      isMain: [false, [Validators.required]],
      customer: [null, [Validators.required]],
    });
  }

  loadResource(): void {
    this.resource = this.stop;

    if (!this.resource) {
      return;
    }

    if (this.resource.customer) {
      this.isLoading = true;
      this.customersService.get(this.resource.customer).subscribe((customer) => {
        this.customers = [customer, ...this.customers];
        this.isLoading = false;
      });
    }

    Object.keys(this.resource).forEach(key => {
      if (this.validateForm.controls[key]) {
        this.validateForm.controls[key].setValue(this.resource[key]);
      }
    });
  }

  list(): void {
    this.router.navigate(['/stops/stops-list']);
  }

  handleAddressChange(address: any): void {
    const city = address.address_components?.find(component => component.types.includes('administrative_area_level_2'));
    const state = address.address_components?.find(component => component.types.includes('administrative_area_level_1'));
    const latitude = address.geometry?.location.lat();
    const longitude = address.geometry?.location.lng();
    const formattedAddress = address.formatted_address;

    this.validateForm.patchValue({
      city: city?.long_name,
      state: state?.short_name,
      latitude,
      longitude,
      address: formattedAddress,
    });
  }
}
