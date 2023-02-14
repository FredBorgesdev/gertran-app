import {Component, Input, OnInit} from '@angular/core';
import {BaseWorkdayFilter} from '../../reports.service';
import {WorkdayService} from '../../../workdays/workday.service';
import {Choice} from '../../../shared/services/api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-workday-justification',
  templateUrl: './workday-justification.component.html',
  styleUrls: ['./workday-justification.component.css']
})
export class WorkdayJustificationComponent implements OnInit {
  @Input() daysWithoutEvents: string[];
  @Input() form: BaseWorkdayFilter;

  status: Choice[] = [];

  validateForms: FormGroup[] = [];

  constructor(
    private workdayService: WorkdayService,
    private formBuilder: FormBuilder,
    private message: NzMessageService,
    private modal: NzModalService,
  ) {
  }

  ngOnInit(): void {
    this.validateForms = this.daysWithoutEvents.map((day) => {
      const formGroup = this.formBuilder.group({
        observations: [null, [Validators.required]],
        status: [null, [Validators.required]],
        startedAt: [day, []]
      });
      formGroup.get('startedAt').disable();

      return formGroup;
    });

    this.workdayService.getWorkdayStatus(true).subscribe((status) => {
      this.status = status;
    });
  }

  save(index: number): void {
    const form = this.validateForms[index];
    const values = form.getRawValue();

    if (form.invalid) {
      console.log(form);
      this.message.error('Preencha todos os campos corretamente!');
      return;
    }

    const data = {
      driver: this.form.driver,
      customer: this.form.customer,
      startedAt: values.startedAt,
      status: values.status,
      observations: values.observations,
    };

    this.workdayService.justify(data).subscribe(() => {
      this.daysWithoutEvents.splice(index, 1);
      this.validateForms.splice(index, 1);

      if (this.daysWithoutEvents.length === 0) {
        this.modal.closeAll();
      }

      this.message.success('Justificativa salva com sucesso!');
    });
  }

}
