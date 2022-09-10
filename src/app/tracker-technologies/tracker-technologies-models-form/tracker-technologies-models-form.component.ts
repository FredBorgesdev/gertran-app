import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TrackerTechnologiesModelsService, TrackerTechnologiesModels } from '../tracker-technologies-models.service';
import { TrackerTechnologies } from '../tracker-technologies.service';

@Component({
  selector: 'app-tracker-technologies-models-form',
  templateUrl: './tracker-technologies-models-form.component.html',
  styleUrls: ['./tracker-technologies-models-form.component.css'],
})
export class TrackerTechnologiesModelsFormComponent implements OnInit {
  @Input() trackerTechnology: TrackerTechnologies = null
  @Input() trackerTechnologyModel: TrackerTechnologiesModels = null
  @Input() isVisible = false
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() onSuccess: EventEmitter<void> = new EventEmitter<void>();

  isLoading = false

  validateForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private service: TrackerTechnologiesModelsService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      name: [this.trackerTechnologyModel?.name, [Validators.required]],
    })
  }

  save() {
    if (!this.validateForm.valid) {
      Object.values(this.validateForm.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      });
    }

    this.isLoading = true
    if (this.trackerTechnologyModel?.id) {
      this.service.update(
        this.trackerTechnologyModel.id,
        this.validateForm.value,
        this.trackerTechnology.id
      ).subscribe(() => this.handleSuccess(), () => this.handleError())
    } else {
      this.service.save(this.validateForm.value, this.trackerTechnology.id)
        .subscribe(() => this.handleSuccess(), () => this.handleError())
    }
  }

  handleCancel() {
    this.onCancel.emit();
  }

  private handleSuccess() {
    this.message.success('Registro salvo com sucesso')
    this.isLoading = false
    this.onSuccess.emit();
  }

  private handleError() {
    this.message.error('Ocorreu um erro ao salvar o registro')
    this.isLoading = false
  }
}
