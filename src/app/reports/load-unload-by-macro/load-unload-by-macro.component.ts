import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Customer} from '../../customers/customers.service';
import {en_US, NzI18nService} from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-load-unload-by-macro',
  templateUrl: './load-unload-by-macro.component.html',
  styleUrls: ['./load-unload-by-macro.component.css']
})
export class LoadUnloadByMacroComponent implements OnInit {
  isLoading = false;
  validateForm: FormGroup;
  customers: Customer[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private i18n: NzI18nService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      customer: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      reportFormat: [null, [Validators.required]],
    });

    this.i18n.setLocale(en_US);
  }

}
