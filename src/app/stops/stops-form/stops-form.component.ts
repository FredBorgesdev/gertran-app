import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TransferItem} from 'ng-zorro-antd/transfer';
import {Stop, StopsService} from '../stops.service';
import {BaseCrudFormComponent} from '../../base-crud/base-crud-form/base-crud-form.component';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Customer, CustomersService} from '../../customers/customers.service';
import {SelectableCustomerServiceService} from '../../customers/selectable-customer-service.service';
import {AuthenticationService} from "../../authentication/authentication.service";
import {googlePlacesOptions} from "../../shared/data/google-places-options";
import {AddressSelectComponent} from "../../shared/address-select/address-select.component";
import brazilianStates from "../../shared/data/brazilian-states";

@Component({
  selector: 'app-stops-form',
  templateUrl: './stops-form.component.html',
  styleUrls: ['./stops-form.component.css'],
  providers: [SelectableCustomerServiceService]
})
export class StopsFormComponent extends BaseCrudFormComponent<Stop> implements OnInit {
  @Input() stop: Stop;
  googlePlacesOptions = googlePlacesOptions;

  stopTypes = [];
  customers: Customer[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private customersService: CustomersService,
    public selectableCustomerService: SelectableCustomerServiceService,
    public authService: AuthenticationService,
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

    this.selectableCustomerService.init();
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
      customer: [this.authService.customerId, [Validators.required]],
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

  handleAddressChange(nominatimAddress: any): void {
    const city = nominatimAddress.address.city || nominatimAddress.address.town || nominatimAddress.address.village;
    const state = brazilianStates.find(
      ({name}) => name === nominatimAddress.address.state
    ).abbreviation;
    const latitude = Number(nominatimAddress.lat).toFixed(6);
    const longitude = Number(nominatimAddress.lon).toFixed(6);

    this.validateForm.patchValue({
      city,
      state,
      latitude,
      longitude,
    });
  }

  getValues(): Stop {
    const formattedAddress = AddressSelectComponent.enhanceOutputAddress(
      this.validateForm.value.address.displayName
    );

    return {
      ...super.getValues(),
      address: formattedAddress
    };
  }
}
