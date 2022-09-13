import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { VehicleManufacturersService, VehicleManufacturers } from '../vehicle-manufacturers.service';

@Component({
  selector: 'app-vehicle-manufacturers-form',
  templateUrl: './vehicle-manufacturers-form.component.html',
  styleUrls: ['./vehicle-manufacturers-form.component.css'],
})
export class VehicleManufacturersFormComponent implements OnInit {
  isLoading = false;
  vehicleManufacturers: VehicleManufacturers = null;

  validateForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private service: VehicleManufacturersService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      makesTrucks: [false, [Validators.required]],
      makesWagons: [false, [Validators.required]],
    });
    this.loadVehicleManufacturers();
  }

  loadVehicleManufacturers() {
    if (this.activatedRoute.snapshot.paramMap.has('id')) {
      this.isLoading = true;
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.service.get(id).subscribe(vehicleManufacturers => {
        this.vehicleManufacturers = vehicleManufacturers;

        this.validateForm.patchValue({
          name: this.vehicleManufacturers.name,
          makesTrucks: this.vehicleManufacturers.makesTrucks || false,
          makesWagons: this.vehicleManufacturers.makesWagons || false,
        });

        this.isLoading = false;
      });
    }
  }

  list() {
    this.router.navigate(['/vehicle-manufacturers/vehicle-manufacturers-list']);
  }

  save() {
    if (!this.validateForm.valid) {
      Object.values(this.validateForm.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      });
    }

    this.isLoading = true;
    if (this.vehicleManufacturers?.id) {
      this.service.update(
        this.vehicleManufacturers.id,
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
