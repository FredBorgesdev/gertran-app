import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {DdrsService, Ddr} from '../ddrs.service';
import { InsuranceCompaniesService } from 'src/app/insurance-companies/insurance-companies.service';

@Component({
  selector: 'app-ddrs-form',
  templateUrl: './ddrs-form.component.html',
  styleUrls: ['./ddrs-form.component.css']
})
export class DdrsFormComponent implements OnInit {

  isLoading = false;
  ddr: Ddr = null;

  validateForm: FormGroup;
  insuranceCompanies: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private ddrService: DdrsService,
    private message: NzMessageService,
    private insuranceCompaniesService: InsuranceCompaniesService,

  ) {
  }

  ngOnInit(): void {
    this.insuranceCompaniesService.getAll({limit: 999}).subscribe(response => {
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
    this.loadInsuranceCompany();
  }

  loadInsuranceCompany() {
    if (this.activatedRoute.snapshot.paramMap.has('id')) {
      this.isLoading = true;
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.ddrService.get(id).subscribe(ddr => {
        this.ddr = ddr;

        this.validateForm.patchValue({
          tradingName: ddr.tradingName,
          cnpj: ddr.cnpj,
          startCoverage: ddr.startCoverage,
          endCoverage: ddr.endCoverage,
          broker: ddr.broker,
          insuranceCompany: ddr.insuranceCompany,
        });


        this.isLoading = false;
      });
    }
  }

  listInsuranceCompanies() {
    this.router.navigate(['/ddrs/ddrs-list']);
  }

  save() {
    if (!this.validateForm.valid) {
      Object.values(this.validateForm.controls).forEach(control => {
        if (!control.invalid) {
          return;
        }
        control.markAsDirty();
        control.updateValueAndValidity({onlySelf: true});
      });
    }

    this.isLoading = true;
    if (this.ddr?.id) {
      this.ddrService.update(
        this.ddr.id,
        this.validateForm.value
      ).subscribe(() => this.handleSuccess(), () => this.handleError());
    } else {
      this.ddrService.save(this.validateForm.value)
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
