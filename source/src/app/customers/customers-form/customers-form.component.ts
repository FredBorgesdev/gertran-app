import {
  Component,
  OnInit,
} from '@angular/core'
import {
  ActivatedRoute,
  Router
} from '@angular/router'
import { NzMessageService } from 'ng-zorro-antd/message'

@Component({
  selector: 'app-customers-form',
  templateUrl: './customers-form.component.html',
  styleUrls: ['./customers-form.component.css']
})
export class CustomersFormComponent implements OnInit {

  isLoading = false

  customersList = [
    {
      id: 1,
      brandName: 'Gertran',
      companyName: 'Gertran Transportes Ltda',
      cnpj: '99.999.999/9999-99',
      contactName: 'Sergio',
      contactEmail: 'gertran@gertran.com.br',
      blocked: false
    },
    {
      id: 999,
      brandName: 'Zayit Transportes',
      companyName: 'Zayit Soluções em Transportes Ltda',
      cnpj: '10.326.985/0001-01',
      contactName: 'Rodrigo Zayit',
      contactEmail: 'rodrigo@zayit.com.br',
      blocked: false
    },
    {
      id: 25,
      brandName: 'Empresa de Transporte',
      companyName: 'Empresa de Transportes Ltda',
      cnpj: '20.326.985/0001-01',
      contactName: 'John Doe',
      contactEmail: 'john@doe.com',
      blocked: true
    },
    {
      id: 325,
      brandName: '3M Transportadora',
      companyName: '3 Marias Transportadora de Cargas LTDA',
      cnpj: '30.085.036/0001-86',
      contactName: 'Maria',
      contactEmail: 'maria@3marias.com.br',
      blocked: false
    },
    {
      id: 187,
      brandName: '4 Irmãos Transportes',
      companyName: '4 Irmãos Transportes Ltda',
      cnpj: '38.471.340/0001-73',
      contactName: 'Ayslan Sergio',
      contactEmail: 'ayslansergio@icloud.com',
      blocked: true
    },
  ]
  customer = null

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.isLoading = true
    setTimeout(() => {
      this.route.snapshot.paramMap.has('id') ? this.loadCustomer() : this.createNewCustomer()
      this.isLoading = false
    }, 333)
  }

  loadCustomer() {
    this.customer = this.customersList.find(c => c.id == +this.route.snapshot.paramMap.get('id'))
  }

  createNewCustomer() {
    this.customer = {
      id: null,
      brandName: '',
      companyName: '',
      cnpj: '',
      contactName: '',
      contactEmail: '',
      blocked: false
    }
  }

  save() {
    this.isLoading = true
    setTimeout(() => {
      this.isLoading = false
      this.message.success(
        'As informações foram salvas com sucesso!',
        { nzDuration: 3000 }
      )
    }, 333)
  }

  listCustomers() {
    this.router.navigate(['/customers/customers-list']);
  }
}
