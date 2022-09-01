import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  AfterViewChecked
} from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import {
  ActivatedRoute,
  Router
} from '@angular/router'
import { NzMessageService } from 'ng-zorro-antd/message'
import { Customer } from '../customers-customer/customers-customer.component'

@Component({
  selector: 'app-customers-form',
  templateUrl: './customers-form.component.html',
  styleUrls: ['./customers-form.component.css']
})
export class CustomersFormComponent implements OnInit {

  @Input() customer: Customer = null
  @Output() onSave: EventEmitter<Customer> = new EventEmitter<Customer>()

  validateForm: FormGroup

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  save() {
    this.onSave.emit(this.validateForm.value)
  }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      brandName: [this.customer?.companyName],
      companyName: [this.customer?.companyName],
      cnpj: [this.customer?.cnpj],
      cep: [this.customer?.cep],
      address: [this.customer?.address],
      number: [this.customer?.number],
      complement: [this.customer?.complement],
      neighborhood: [this.customer?.neighborhood],
      city: [this.customer?.city],
      state: [this.customer?.state],
    })
  }

  listCustomers() {
    this.router.navigate(['/customers/customers-list']);
  }
}
