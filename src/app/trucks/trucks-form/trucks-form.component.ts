import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {VehicleModelsService} from '../../vehicle-manufacturers/vehicle-models.service';
import {VehicleModelTypesService} from '../../vehicle-model-types/vehicle-model-types.service';
import {VehicleManufacturersService} from '../../vehicle-manufacturers/vehicle-manufacturers.service';
import {Truck, TrucksService} from '../trucks.service';
import {FormBuilder} from '@angular/forms';
import {VehiclesFormComponent} from '../../vehicles/vehicles-form/vehicles-form.component';
import {SelectableCustomerServiceService} from '../../customers/selectable-customer-service.service';
import {
  SelectableVehicleManufacturersService
} from '../../vehicle-manufacturers/selectable-vehicle-manufacturers.service';
import {UtilsService} from '../../shared/services/utils.service';
import {AuthenticationService} from '../../authentication/authentication.service';
import {SelectableVehicleModelService} from "../../vehicles/selectable-vehicle-model.service";
import { Choice } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-trucks-form',
  templateUrl: './trucks-form.component.html',
  styleUrls: ['./trucks-form.component.css'],
  providers: [SelectableCustomerServiceService]
})
export class TrucksFormComponent extends VehiclesFormComponent<Truck> implements OnInit {
  @Input() truck: Truck;
  workingSituations: Choice[] = [];
  chargingMethods: Choice[] = [
    {
      label:'Mensal',value:'monthly'
      
    },
    {
      label:'Avulso',value:'single'
      
    }
  ];

  constructor(
    private router: Router,
    selectableVehicleManufacturersService: SelectableVehicleManufacturersService,
    selectableCustomersService: SelectableCustomerServiceService,
    selectableVehicleModelService: SelectableVehicleModelService,
    vehicleModelsService: VehicleModelsService,
    vehicleModelTypesService: VehicleModelTypesService,
    vehicleManufacturersService: VehicleManufacturersService,
    formBuilder: FormBuilder,
    service: TrucksService,
    activatedRoute: ActivatedRoute,
    message: NzMessageService,
    utilsService: UtilsService,
    authService: AuthenticationService,
  ) {
    super(
      service,
      message,
      activatedRoute,
      formBuilder,
      vehicleModelsService,
      vehicleModelTypesService,
      vehicleManufacturersService,
      utilsService,
      selectableCustomersService,
      selectableVehicleManufacturersService,
      authService,
      selectableVehicleModelService,
    );
  }

  loadFormBuilder(): void {
    super.loadFormBuilder([
      'numberOfAxles',
      'cubage',
      'hasFatigueCamera',
      'cameraSerialNumber'
    ]);
  }

  loadResource(): void {
    super.loadResource([
      'numberOfAxles',
      'cubage',
      'hasFatigueCamera',
      'cameraSerialNumber'
    ]);
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.paramMap.get('customer_id') != '') {
      this.authService.setCustomer(this.activatedRoute.snapshot.paramMap.get('customer_id'));
    }
    this.resource = this.truck;

    super.ngOnInit();
    this.service.getWorkingSituations().subscribe((workingSituations) => {
      this.workingSituations = workingSituations;
    });
  }

  backToCustomerList(): void {
    if(!this.authService.customerId || this.activatedRoute.snapshot.paramMap.get('customer_id') == '' || this.activatedRoute.snapshot.paramMap.get('customer_id') == null)
      this.router.navigate(['trucks', 'trucks-list']);
    else
      this.router.navigate(['customers', 'customers-edit',  this.activatedRoute.snapshot.paramMap.get('customer_id')]);
  }

  log($event: Event) {
    console.log($event);
  }

  protected handleSuccess(response?: any): void {
    this.message.success('Registro salvo com sucesso');
    this.backToCustomerList()
    this.isLoading = false;
  }
}
