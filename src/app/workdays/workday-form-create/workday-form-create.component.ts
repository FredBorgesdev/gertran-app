import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { WorkdayService } from "../workday.service";
import { NzModalRef } from "ng-zorro-antd/modal";

@Component({
  selector: 'app-workday-form-create',
  templateUrl: './workday-form-create.component.html',
})
export class WorkdayFormCreateComponent implements OnInit {
  form: FormGroup;
  @Input() isEdit = false;
  @Input() workdayId: string | null = null;
  @Input() customer: string | null = null;
  @Input() driver: string | null = null;

  isLoading = false;


  constructor(
    private fb: FormBuilder,
    private workdayService: WorkdayService,
    private modalRef: NzModalRef
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      status: [null, Validators.required],
      started_at: [null],
      observations: ['', Validators.required],  // Campo de observações
      // was_generated_by_system: [false],
  
      customer: [this.customer ? this.customer : null, Validators.required],
      driver: [this.driver ? this.driver : null, Validators.required],
    });
  
    if (this.isEdit && this.workdayId) {
      this.loadWorkday();
    }
  }

  loadWorkday(): void {
    this.isLoading = true
    this.workdayService.getWorkday(this.workdayId).subscribe((data) => {
      this.form.controls.started_at.setValue(data.startedAt);
      this.form.controls.status.setValue(data.status);
      this.form.controls.observations.setValue(data.observations);  // Preenche o campo de observações
      this.isLoading = false
    });
  }

  submitForm(): void {
    if (this.form.invalid) {
      return;
    }

    if (this.isEdit && this.workdayId) {
      this.workdayService.updateWorkday(this.workdayId, this.form.value).subscribe(() => {
        this.modalRef.close(true);
      });
    } else {
      this.workdayService.createWorkday(this.form.value).subscribe(() => {
        this.modalRef.close(true);
      });
    }
  }
}