import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RiskAreaService, RiskArea } from '../risk-area.service';
import { InsuranceCompaniesService } from 'src/app/insurance-companies/insurance-companies.service';

@Component({
  selector: 'app-risk-area-form',
  templateUrl: './risk-area-form.component.html',
  styleUrls: ['./risk-area-form.component.css']
})
export class RiskAreaFormComponent implements OnInit {

  isLoading = false;
  item: RiskArea = null;
  validateForm: FormGroup;
  insuranceCompanies: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private service: RiskAreaService,
    private message: NzMessageService,
    private insuranceCompaniesService: InsuranceCompaniesService,
  ) {}

  ngOnInit(): void {
    this.insuranceCompaniesService.getAll({ limit: 999 }).subscribe(response => {
      this.insuranceCompanies = response.results;
    });

  this.validateForm = this.formBuilder.group({
    name: [null, [Validators.required]], // ← nome da área de risco
    latitude: [null, [Validators.required]],
    longitude: [null, [Validators.required]],
    radius_risk_area: [null, [Validators.required]],
    point_type: ['risk-area', [Validators.required]], // default: risk-area
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
    this.router.navigate(['/risk-area/risk-area-list']);
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
    this.message.success('RiskArea salvo com sucesso');
    this.navigateToList();
    this.isLoading = false;
  }

  private handleError() {
    this.message.error('Erro ao salvar RiskArea');
    this.isLoading = false;
  }
}
