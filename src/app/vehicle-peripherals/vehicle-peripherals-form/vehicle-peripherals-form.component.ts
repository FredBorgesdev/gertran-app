import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { VehiclePeripheralsService, VehiclePeripherals } from '../vehicle-peripherals.service';

@Component({
  selector: 'app-vehicle-peripherals-form',
  templateUrl: './vehicle-peripherals-form.component.html',
  styleUrls: ['./vehicle-peripherals-form.component.css'],
})
export class VehiclePeripheralsFormComponent implements OnInit {
  isLoading = false;
  vehiclePeripherals: VehiclePeripherals = null;

  validateForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private service: VehiclePeripheralsService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      peripheralType: [null, [Validators.required]],
    });
    this.loadVehiclePeripherals();
  }

  loadVehiclePeripherals() {
    if (this.activatedRoute.snapshot.paramMap.has('id')) {
      this.isLoading = true;
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.service.get(id).subscribe(vehiclePeripherals => {
        this.vehiclePeripherals = vehiclePeripherals;

        this.validateForm.patchValue({
          name: this.vehiclePeripherals.name,
          peripheralType: this.vehiclePeripherals.peripheralType,
        });

        this.isLoading = false;
      });
    }
  }

  list() {
    this.router.navigate(['/vehicle-peripherals/vehicle-peripherals-list']);
  }

  save() {
    if (!this.validateForm.valid) {
      return Object.values(this.validateForm.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      });
    }

    this.isLoading = true;
    if (this.vehiclePeripherals?.id) {
      this.service.update(
        this.vehiclePeripherals.id,
        this.validateForm.value
      ).subscribe(() => this.handleSuccess(), () => this.handleError());
    } else {
      this.service.save(this.validateForm.value)
        .subscribe(() => this.handleSuccess(), () => this.handleError());
    }
  }

  private handleSuccess() {
    this.message.success('Registro salvo com sucesso');
    this.list();
    this.isLoading = false;
  }

  private handleError() {
    this.message.error('Ocorreu um erro ao salvar o registro');
    this.isLoading = false;
  }
}
