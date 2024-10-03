import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseCrudFormComponent } from '../../base-crud/base-crud-form/base-crud-form.component';
import { Workday, WorkdayService } from '../workday.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { WorkdayFormCreateComponent } from '../workday-form-create/workday-form-create.component';
import {format, subMonths} from 'date-fns';

@Component({
  selector: 'app-workday-justify',
  templateUrl: './workday-justify.component.html',
  styleUrls: ['./workday-justify.component.css'],
})
export class WorkdayJustifyComponent extends BaseCrudFormComponent<Workday> {
  customer: string;
  driver: string;
  isLoading = false;
  validateForm: FormGroup;

  workdayRows: any[] = [];
  groupedWorkdayRows: { date: string; records: any[] }[] = [];

  fromDate: any;
  toDate: any;

  hoursMask = [/[0-2]/, /[0-9]/, ':', /[0-5]/, /[0-9]/];

  constructor(
    private formBuilder: FormBuilder,
    private modal: NzModalService,
    public workdayService: WorkdayService,
    message: NzMessageService,
    activatedRoute: ActivatedRoute
  ) {
    super(workdayService, message, activatedRoute);
  }

  // generateMacros(a): void {
  //   this.workdayRows = a.data.results;
  //   this.fromDate = a.fromDate;
  //   this.toDate = a.toDate;
  //   this.customer = a.customer;
  //   this.driver = a.driver;

  //   this.groupedWorkdayRows = this.groupByDate(this.workdayRows);
  // }

  groupByDate(workdays: any[]): { date: string; records: any[] }[] {
    const grouped: { [key: string]: any[] } = {};

    workdays.forEach((workday) => {
      const date = new Date(workday.startedAt).toLocaleDateString('pt-BR'); // Agrupa pela data formatada
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(workday);
    });

    return Object.keys(grouped).map((date) => ({ date, records: grouped[date] }));
  }

  newWorkday2({driver,customer}): void {
    this.modal.create({
      nzTitle: 'Adicionar registro de ponto',
      nzContent: WorkdayFormCreateComponent,
      nzComponentParams: {
        driver: driver,
        customer: customer,
        isEdit: false,
      },
      nzWidth: '80%',
      nzFooter: null,
    });
  }


  newWorkday3({driver,customer,fromDate,toDate}): void {
    this.isLoading = true
    this.workdayService.getAllWorkdays(
      { limit: 999},
      customer, 
      driver,
      fromDate,
      toDate

    ).toPromise().then(x=> {
      this.workdayRows = x.results;
      this.fromDate = fromDate;
      this.toDate = toDate;
      this.customer = customer;
      this.driver = driver;
      this.groupedWorkdayRows = this.groupByDate(this.workdayRows);
      this.isLoading = false
    })


  }


  edit(a) {
    this.modal.create({
      nzTitle: 'Editar registro de ponto',
      nzContent: WorkdayFormCreateComponent,
      nzComponentParams: {
        workdayId: a.id,
        driver: a.driver,
        customer: a.customer,
        isEdit: true,
      },
      nzWidth: '80%',
      nzFooter: null,
    });
  }

  delete(d): void {
    this.modal.confirm({
      nzTitle: 'Tem certeza que deseja excluir?',
      nzContent: 'Esta ação não poderá ser desfeita.',
      nzOkText: 'Sim',
      nzOnOk: () => {
        this.workdayService.deleteWorkday(d.id).toPromise().then((x2) => {
          this.workdayService
            .getAllWorkdays({}, this.customer, this.driver, this.fromDate, this.toDate)
            .toPromise()
            .then((x) => {
              this.workdayRows = x.results;
              this.groupedWorkdayRows = this.groupByDate(this.workdayRows); // Reagrupa após exclusão
            });
        });
      },
    });
  }
}
