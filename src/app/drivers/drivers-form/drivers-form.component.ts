import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {conformToMask} from 'angular2-text-mask';
import {en_US, NzI18nService} from 'ng-zorro-antd/i18n';
import {Customer, CustomersService} from 'src/app/customers/customers.service';
import {Driver, DriversService} from '../drivers.service';
import {Choice} from '../../shared/services/api.service';
import {SelectableCustomerServiceService} from '../../customers/selectable-customer-service.service';
import brazilianStates from '../../shared/data/brazilian-states';
import {AuthenticationService} from '../../authentication/authentication.service';

@Component({
  selector: 'app-drivers-form',
  templateUrl: './drivers-form.component.html',
  styleUrls: ['./drivers-form.component.css'],
  providers: [SelectableCustomerServiceService],
})
export class DriversFormComponent implements OnInit {
  workingSituations: Choice[] = [];
  isChangePasswordModalVisible = false;
  validatePasswordForm: FormGroup;



  @Input() driver: Driver;
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() driverChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() changePassword: EventEmitter<string> = new EventEmitter<string>();

  validateForm: FormGroup;
  cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  states = brazilianStates;
  phoneNumberMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private customersService: CustomersService,
    private i18n: NzI18nService,
    private service: DriversService,
    public selectableCustomerService: SelectableCustomerServiceService,
    public authService: AuthenticationService,
  ) {

    this.validatePasswordForm = formBuilder.group({
      password: [null, [Validators.required, Validators.minLength(6)]],
    });


  }

  ngOnInit(): void {


    const {conformedValue: maskedCpf} = conformToMask(this.driver?.cpf, this.cpfMask, {guide: false});
    const defaultCustomers = [this.authService.customerId].filter(Boolean);

    this.validateForm = this.formBuilder.group({
      customers: [
        this.driver?.customers || defaultCustomers,
        [Validators.required]
      ],
      workingSituation: [this.driver?.workingSituation, []],
      name: [this.driver?.name, [Validators.required]],
      rg: [this.driver?.rg, [Validators.required]],
      cpf: [maskedCpf, [Validators.required, Validators.pattern('[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}')]],
      cnhNumber: [this.driver?.cnhNumber, [Validators.required]],
      cnhCategory: [this.driver?.cnhCategory, [Validators.required]],
      cnhValidity: [this.driver?.cnhValidity, [Validators.required]],
      cnhIssuerUf: [this.driver?.cnhIssuerUf, [Validators.required]],
      cnhFirstIssue: [this.driver?.cnhFirstIssue, [Validators.required]],
      cnhEmission: [this.driver?.cnhEmission, [Validators.required]],
      admissionDate: [this.driver?.admissionDate, []],
      phoneNumber: [this.driver?.phoneNumber, [Validators.required]],
    });




    this.validateForm.get('workingSituation').valueChanges.subscribe(value => {
      if (value === 'working') {
        this.validateForm.get('admissionDate').setValidators([Validators.required]);
      }
    });

    if (!this.authService.customerId) {
      this.selectableCustomerService.init();
    }

    if (this.driver.customers) {
      this.selectableCustomerService.concatCustomers(this.driver.customers);
      this.validateForm.patchValue({
        customers: this.driver.customers.map((customer) => customer.id)
      });
    }

    this.service.getWorkingSituations().subscribe((workingSituations) => {
      this.workingSituations = workingSituations;
    });

    this.i18n.setLocale(en_US);
  }


  submitPassword():void {
    if (this.validatePasswordForm.valid) {
      const passwordL = this.validatePasswordForm.controls.password.value
      // console.log(passwordL, );
      this.changePassword.emit(passwordL);
      this.isChangePasswordModalVisible = false;
    }
  }

  save(): void {
    if (this.validateForm.valid) {
      this.submitForm.emit(this.validateForm.value);
    } else {
      Object.keys(this.validateForm.controls).forEach(key => {
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      });
    }
  }

  listDrivers(): void {
    this.router.navigate(['/drivers/drivers-list']);
  }

  async filterDriverByCpf(): Promise<void> {
    const cpf = this.validateForm.get('cpf').value.replace(/\D/g, '');
    if (!cpf) {
      return;
    }

    const {cpf: currentCf, ...driver} = await this.getByCpf(cpf);
    if (!driver) {
      return;
    }

    this.driverChange.emit(driver);
    this.selectableCustomerService.concatCustomers(driver.customers);

    this.validateForm.patchValue({
      ...driver,
      customers: driver.customers.map(
        (customer) => customer.id
      ).concat(this.authService.customerId).filter(Boolean),
    });
  }

  private getByCpf(cpf: string): Promise<Driver> {
    return this.service.getByCpf(cpf).toPromise().catch(() => null);
  }
}
