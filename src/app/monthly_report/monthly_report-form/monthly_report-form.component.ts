import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MonthlyReportService, MonthlyReport } from '../monthly_report.service';
import { InsuranceCompaniesService } from 'src/app/insurance-companies/insurance-companies.service';

@Component({
  selector: 'app-monthly_report-form',
  templateUrl: './monthly_report-form.component.html',
  styleUrls: ['./monthly_report-form.component.css']
})
export class MonthlyReportFormComponent implements OnInit {

  isLoading = false;
  item: MonthlyReport = null;
  validateForm: FormGroup;
  insuranceCompanies: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private service: MonthlyReportService,
    private message: NzMessageService,
    private insuranceCompaniesService: InsuranceCompaniesService,
  ) {}

  ngOnInit(): void {
    this.insuranceCompaniesService.getAll({ limit: 999 }).subscribe(response => {
      this.insuranceCompanies = response.results;
    });

    this.validateForm = this.formBuilder.group({
      tradingName: [null, [Validators.required]],
      cnpj: [null, [Validators.required]],
      startCoverage: [null, [Validators.required]],
      endCoverage: [null, [Validators.required]],
      broker: [null, [Validators.required]],
      insuranceCompany: [null, [Validators.required]],
    });

    this.loadItem();
  }

  loadItem() {
    if (this.activatedRoute.snapshot.paramMap.has('id')) {
      this.isLoading = true;
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.service.get(id).subscribe(data => {
        this.item = data;
        this.validateForm.patchValue(data);
        this.isLoading = false;
      });
    }
  }

  navigateToList() {
    this.router.navigate(['/monthly_report/monthly_report-list']);
  }

  save() {
    if (!this.validateForm.valid) {
      Object.values(this.validateForm.controls).forEach(control => {
        if (!control.invalid) return;
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      });
      return;
    }

    this.isLoading = true;

    const payload = this.validateForm.value;

    if (this.item?.id) {
      this.service.update(this.item.id, payload)
        .subscribe(() => this.handleSuccess(), () => this.handleError());
    } else {
      this.service.save(payload)
        .subscribe(() => this.handleSuccess(), () => this.handleError());
    }
  }

  private handleSuccess() {
    this.message.success('MonthlyReport salvo com sucesso');
    this.navigateToList();
    this.isLoading = false;
  }

  private handleError() {
    this.message.error('Erro ao salvar MonthlyReport');
    this.isLoading = false;
  }
}
