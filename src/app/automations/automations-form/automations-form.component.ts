import { Component, OnInit } from '@angular/core';
import {Automation, AutomationsService} from '../automations.service';
import {Choice} from '../../shared/services/api.service';
import {BaseCrudFormComponent} from '../../base-crud/base-crud-form/base-crud-form.component';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {Customer, CustomersService} from '../../customers/customers.service';
import {NzModalService} from 'ng-zorro-antd/modal';
import {CustomersTransferComponent} from '../../customers/customers-transfer/customers-transfer.component';
import {TransferChange, TransferItem} from 'ng-zorro-antd/transfer';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-automations-form',
  templateUrl: './automations-form.component.html',
  styleUrls: ['./automations-form.component.css']
})
export class AutomationsFormComponent extends BaseCrudFormComponent<Automation> implements OnInit {
  events: Choice[] = [];
  actions: Choice[] = [];
  commands: TransferItem[] = [];

  customers: Customer[] = [];

  constructor(
    service: AutomationsService,
    message: NzMessageService,
    activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private customersService: CustomersService,
    private router: Router,
    private modal: NzModalService,
  ) {
    super(
      service,
      message,
      activatedRoute,
    );
  }

  loadFormBuilder(): void {
    this.validateForm = this.formBuilder.group({
      event: [null, [Validators.required]],
      action: [null, [Validators.required]],
      command: [null, []],
      commands: [null, []],
      reason: [null, []],
      isActive: [null, [Validators.required]],
      isForAllCustomers: [true, [Validators.required]],
      customers: [[], []],
      name: [null, [Validators.required]],
      hasTravelSm: [null, [Validators.required]],
      hasVehicleMessage: [null, [Validators.required]],
      vehicleMessage: [{ value: null, disabled: true }, []],
      hasTimeAction: [null, [Validators.required]],
      timeAction: [{ value: null, disabled: true }, []],
      hasVelocity: [null, [Validators.required]],
      velocity: [{ value: null, disabled: true }, []],
      hasIgnition: [null, [Validators.required]],
      ignitionMessage: [{ value: null, disabled: true }, []],
      hasCommand: [false, [Validators.required]],
      hasSendMessage: [null, [Validators.required]],
      sendMessage: [{ value: null, disabled: true }, []],
      hasAlertOperator: [null, [Validators.required]],
      alertOperatorMessage: [{ value: null, disabled: true }, []],
      hasOccurrence: [null, [Validators.required]],
      occurrenceMessage: [{ value: null, disabled: true }, []],
    });

    this.validateForm.get('hasVehicleMessage').valueChanges.subscribe(value => {
      this.validateControlRequired(value, 'vehicleMessage');
    });
    this.validateForm.get('hasTimeAction').valueChanges.subscribe(value => {
      this.validateControlRequired(value, 'timeAction');
    });
    this.validateForm.get('hasVelocity').valueChanges.subscribe(value => {
      this.validateControlRequired(value, 'velocity');
    });
    this.validateForm.get('hasIgnition').valueChanges.subscribe(value => {
      this.validateControlRequired(value, 'ignitionMessage');
    });
    this.validateForm.get('hasSendMessage').valueChanges.subscribe(value => {
      this.validateControlRequired(value, 'sendMessage');
    });
    this.validateForm.get('hasAlertOperator').valueChanges.subscribe(value => {
      this.validateControlRequired(value, 'alertOperatorMessage');
    });
    this.validateForm.get('hasOccurrence').valueChanges.subscribe(value => {
      this.validateControlRequired(value, 'occurrenceMessage');
    });
  }

  performFormGroupSetValues(): void {
    super.performFormGroupSetValues();

    this.validateForm.patchValue({
      customers: this.resource?.customers.map(customer => customer.id),
    });
  }

  validateControlRequired(value: string, control: string): void {
    if (value) {
      this.validateForm.get(control).setValidators([Validators.required]);
      this.validateForm.get(control).enable();
    } else {
      this.validateForm.get(control).setValidators([]);
      this.validateForm.get(control).disable();
    }
    this.validateForm.get(control).updateValueAndValidity();
  }

  ngOnInit(): void {
    super.ngOnInit();

    (this.service as AutomationsService).getEvents().subscribe(data => {
      this.events = data;
    });
    (this.service as AutomationsService).getActions().subscribe(data => {
      this.actions = data;
    });
    (this.service as AutomationsService).getCommands().subscribe(data => {
      this.commands = data.map(command => ({
        ...command,
        id: command.value,
        key: command.value,
        title: command.label,
      }));
    });
  }

  onAllCustomersChange(): void {
    if (this.validateForm.get('isForAllCustomers').value) {
      this.customersService.getAll({ limit: 999 }).subscribe(data => {
        this.customers = data.results;
      });
    }
  }

  list(): void {
    this.router.navigate(['automations', 'automations-list']);
  }

  showCustomersModal(): void {
    this.modal.create({
      nzTitle: 'Empresas',
      nzContent: CustomersTransferComponent,
      nzWidth: '70%',
      nzComponentParams: {
        selectedCustomerIds: this.validateForm.get('customers').value,
      },
      nzOnOk: (componentInstance) => {
        const customers = componentInstance.getSelectedCustomers();
        const customersIds = customers.map(customer => customer.id);

        this.validateForm.get('customers').setValue(customersIds);
      }
    });
  }

  drop(event: CdkDragDrop<string[]>): void {
    const rightItems = this.commands.filter(item => item.direction === 'right');
    const leftItems = this.commands.filter(item => item.direction === 'left');
    moveItemInArray(rightItems, event.previousIndex, event.currentIndex);
    this.commands = [...leftItems, ...rightItems];

    this.validateForm.get('commands').setValue(this.mapCommands());
  }

  onTransferChange(event: TransferChange): void {
    const rightItems = this.commands.filter(item => item.direction === 'right');
    console.log(rightItems)

    this.validateForm.get('commands').setValue(this.mapCommands());
    this.validateForm.get('hasCommand').setValue(rightItems.length > 0);
  }

  mapCommands(): { id: string; order: number }[] {
    const commands = this.commands.filter(item => item.direction === 'right');

    return commands.map((item, index) => ({
      id: item.id,
      order: index + 1,
    }));
  }
}
