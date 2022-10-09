import { Component, OnInit } from '@angular/core';
import {BaseCrudFormComponent} from '../../base-crud/base-crud-form/base-crud-form.component';
import {Terminals, TerminalsService} from '../terminals.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {Customer, CustomersService} from '../../customers/customers.service';
import {TerminalGroups, TerminalGroupsService} from '../terminal-groups.service';
import {TransferItem} from 'ng-zorro-antd/transfer';

@Component({
  selector: 'app-terminals-form',
  templateUrl: './terminals-form.component.html',
  styleUrls: ['./terminals-form.component.css']
})
export class TerminalsFormComponent extends BaseCrudFormComponent<Terminals> implements OnInit {
  customers: Customer[] = [];
  terminalGroups: TerminalGroups[] = [];

  vehicleTransferItems: TransferItem[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private customersService: CustomersService,
    private terminalGroupsService: TerminalGroupsService,
    private router: Router,
    service: TerminalsService,
    message: NzMessageService,
    activatedRoute: ActivatedRoute,
  ) {
    super(
      service,
      message,
      activatedRoute,
    );
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.customersService.getAll({ limit: 999 }).subscribe((response) => {
      this.customers = response.results;
    });
    this.terminalGroupsService.getAll({ limit: 999 }).subscribe((response) => {
      this.terminalGroups = response.results;
    });
  }

  loadFormBuilder(): void {
    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      customer: [null, [Validators.required]],
      terminalGroup: [null, []],
    });
  }

  performFormGroupSetValues(): void {
    super.performFormGroupSetValues();

    this.validateForm.patchValue({
      customer: (this.resource.customer as Customer).id,
      terminalGroup: (this.resource.terminalGroup as TerminalGroups).id,
    });
  }

  list(): void {
    this.router.navigate(['terminals', 'terminals-list']);
  }
}
