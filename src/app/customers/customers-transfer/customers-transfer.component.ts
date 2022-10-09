import {Component, Input, OnInit} from '@angular/core';
import {Customer, CustomersService} from '../customers.service';
import {TransferItem} from 'ng-zorro-antd/transfer';

@Component({
  selector: 'app-customers-transfer',
  templateUrl: './customers-transfer.component.html',
  styleUrls: ['./customers-transfer.component.css']
})
export class CustomersTransferComponent implements OnInit {
  @Input() selectedCustomerIds: string[] = [];

  customers: Customer[] = [];
  transferItems: TransferItem[] = [];

  constructor(
    private customersService: CustomersService
  ) { }

  ngOnInit(): void {
    this.customersService.getAll({ limit: 999 }).subscribe((customers) => {
      this.customers = customers.results;
      this.transferItems = this.customers.map((customer) => ({
        key: customer.id,
        title: customer.tradingName,
        direction: this.selectedCustomerIds.includes(customer.id) ? 'right' : 'left'
      }));
    });
  }

  getSelectedCustomers(): Customer[] {
    return this.transferItems
      .filter((item) => item.direction === 'right')
      .map((item) => this.customers.find((customer) => customer.id === item.key));
  }
}
