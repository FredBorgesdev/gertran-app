import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { VehicleModelTypes, VehicleModelTypesService } from 'src/app/vehicle-model-types/vehicle-model-types.service';
import { VehicleManufacturers } from '../vehicle-manufacturers.service';
import { VehicleModelsService, VehicleModels } from '../vehicle-models.service';

@Component({
  selector: 'app-vehicle-models-form',
  templateUrl: './vehicle-models-form.component.html',
  styleUrls: ['./vehicle-models-form.component.css'],
})
export class VehicleModelsFormComponent implements OnInit {
  @Input() isVisible = false
  @Input() vehicleModel: VehicleModels = null
  @Input() vehicleManufacturer: VehicleManufacturers = null
  @Output() onSuccess: EventEmitter<void> = new EventEmitter<void>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  isLoading = false
  vehicleModelTypes: VehicleModelTypes[] = []

  validateForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private service: VehicleModelsService,
    private message: NzMessageService,
    private vehicleModelTypeService: VehicleModelTypesService,
  ) { }

  ngOnInit(): void {
    this.vehicleModelTypeService.getAll({}).subscribe(vehicleModelTypes => {
      this.vehicleModelTypes = vehicleModelTypes.results
    })

    this.validateForm = this.formBuilder.group({
      name: [this.vehicleModel?.name, [Validators.required]],
      vehicleModelType: [this.vehicleModel?.vehicleModelType, [Validators.required]],
    })
  }

  save() {
    if (!this.validateForm.valid) {
      return Object.values(this.validateForm.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity();
      });
    }

    this.isLoading = true
    if (this.vehicleModel?.id) {
      this.service.update(
        this.vehicleModel.id,
        this.validateForm.value,
        this.vehicleManufacturer.id
      ).subscribe(() => this.handleSuccess(), () => this.handleError())
    } else {
      this.service.save(this.validateForm.value, this.vehicleManufacturer.id)
        .subscribe(() => this.handleSuccess(), () => this.handleError())
    }
  }

  handleCancel() {
    this.onCancel.emit()
  }

  private handleSuccess() {
    this.message.success('Registro salvo com sucesso')
    this.isLoading = false
    this.onSuccess.emit()
  }

  private handleError() {
    this.message.error('Ocorreu um erro ao salvar o registro')
    this.isLoading = false
  }
}
