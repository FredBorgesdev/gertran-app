import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { InsuranceCompaniesService, InsuranceCompany } from '../insurance-companies.service';

@Component({
  selector: 'app-insurance-companies-form',
  templateUrl: './insurance-companies-form.component.html',
  styleUrls: ['./insurance-companies-form.component.css']
})
export class InsuranceCompaniesFormComponent implements OnInit {

  isLoading = false;
  insuranceCompany: InsuranceCompany = null;

  validateForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private insuranceCompaniesService: InsuranceCompaniesService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      website: [null, [Validators.required, Validators.pattern(/^(http(s)?:\/\/)?((w){3}.)?[\w-]+(\.[\w-]+)+[/#?]?.*$/)]],
      phone: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      logo: [null],
    });
    this.loadInsuranceCompany();
  }

  loadInsuranceCompany() {
    if (this.activatedRoute.snapshot.paramMap.has('id')) {
      this.isLoading = true;
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.insuranceCompaniesService.get(id).subscribe(insuranceCompany => {
        this.insuranceCompany = insuranceCompany;

        this.validateForm.patchValue({
          name: insuranceCompany.name,
          website: insuranceCompany.website,
          phone: insuranceCompany.phone,
          email: insuranceCompany.email,
          logo: insuranceCompany.logo,
        });

        this.isLoading = false;
      });
    }
  }

  listInsuranceCompanies() {
    this.router.navigate(['/insurance-companies/insurance-companies-list']);
  }

  save() {
    if (!this.validateForm.valid) {
      Object.values(this.validateForm.controls).forEach(control => {
        if (!control.invalid) { return; }
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      });
    }

    this.isLoading = true;
    if (this.insuranceCompany?.id) {
      this.insuranceCompaniesService.update(
        this.insuranceCompany.id,
        this.validateForm.value
      ).subscribe(() => this.handleSuccess(), () => this.handleError());
    } else {
      this.insuranceCompaniesService.save(this.validateForm.value)
        .subscribe(() => this.handleSuccess(), () => this.handleError());
    }
  }

  private handleSuccess() {
    this.message.success('Seguradora salva com sucesso');
    this.listInsuranceCompanies();
    this.isLoading = false;
  }

  private handleError() {
    this.message.error('Ocorreu um erro ao salvar a seguradora');
    this.isLoading = false;
  }
}
