import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { VehicleModelTypesService, VehicleModelTypes } from '../vehicle-model-types.service';

@Component({
  selector: 'app-vehicle-model-types-form',
  templateUrl: './vehicle-model-types-form.component.html',
  styleUrls: ['./vehicle-model-types-form.component.css'],
})
export class VehicleModelTypesFormComponent implements OnInit {
  isLoading = false
  vehicleModelTypes: VehicleModelTypes = null

  validateForm: FormGroup

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private service: VehicleModelTypesService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
    })
    this.loadVehicleModelTypes()
  }

  loadVehicleModelTypes() {
    if (this.activatedRoute.snapshot.paramMap.has('id')) {
      this.isLoading = true
      const id = this.activatedRoute.snapshot.paramMap.get('id')
      this.service.get(id).subscribe(vehicleModelTypes => {
        this.vehicleModelTypes = vehicleModelTypes

        this.validateForm.patchValue({
          name: this.vehicleModelTypes.name,
        })

        this.isLoading = false
      })
    }
  }

  list() {
    this.router.navigate(['/vehicle-model-types/vehicle-model-types-list'])
  }

  save() {
    if (!this.validateForm.valid) {
      Object.values(this.validateForm.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      });
    }

    this.isLoading = true
    if (this.vehicleModelTypes?.id) {
      this.service.update(
        this.vehicleModelTypes.id,
        this.validateForm.value
      ).subscribe(() => this.handleSuccess(), () => this.handleError())
    } else {
      this.service.save(this.validateForm.value)
        .subscribe(() => this.handleSuccess(), () => this.handleError())
    }
  }

  private handleSuccess() {
    this.message.success('Registro salvo com sucesso')
    this.list()
    this.isLoading = false
  }

  private handleError() {
    this.message.error('Ocorreu um erro ao salvar o registro')
    this.isLoading = false
  }
}
