import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectableCustomerServiceService } from '../../customers/selectable-customer-service.service';
import { Customer, CustomersService } from '../../customers/customers.service';
import { SelectableBranchOfficeService } from 'src/app/customers/selectable-branch-office-service';
@Component({
  selector: 'app-branch-office-select',
  templateUrl: './branch-office-select.component.html',
  providers: [SelectableBranchOfficeService],
})
export class BranchOfficeSelectComponent implements OnInit {
  @Input() filterByAll = false;
  @Output() customerSelected = new EventEmitter<Customer | 'all'>();
  @Input() initialCustomerId: string | null = null;

  selectedCustomerId: number | string | null = null;

  constructor(
    public customerService: SelectableBranchOfficeService,
    private customersService: CustomersService
  ) { }

  ngOnInit(): void {
    this.customerService.init();

    if (this.initialCustomerId != null) {
      this.selectedCustomerId = this.initialCustomerId;

      this.customersService.get(this.initialCustomerId).subscribe((customer) => {
        if (customer) {
          const alreadyExists = this.customerService.customers.some(c => c.id === customer.id);
          if (!alreadyExists) {
            this.customerService.customers.unshift(customer);
          }

          this.customerSelected.emit(customer);
        }
      });
    }
  }


  onSearch(value: string): void {
    this.customerService.searchByName(value);
  }

  onScrollToBottom(): void {
    this.customerService.loadMoreCustomers();
  }

  onSelect(customerId: number | string): void {
    this.selectedCustomerId = customerId;
    const selected = this.customerService.customers.find(c => c.id === customerId);
    this.customerSelected.emit(customerId === 'all' ? 'all' : selected || null);
  }
}
