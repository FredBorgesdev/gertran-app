import {
  Component,
  OnInit
} from '@angular/core'
import {
  ActivatedRoute,
  Router
} from '@angular/router'
import { NzMessageService } from 'ng-zorro-antd/message'

@Component({
  selector: 'app-trucks-form',
  templateUrl: './trucks-form.component.html',
  styleUrls: [ './trucks-form.component.css' ]
})
export class TrucksFormComponent implements OnInit {

  trucksList = [
    {
      id: 1,
      brand: 'Ford',
      model: 'Fusion',
      year: 2020,
      color: 'Azul',
      plate: 'ABC-1234',
      trackingSystem: 'JaburSat',
      trackingModel: 'JB-SAT-1',
      trackingSerialNumber: '123456789'
    },
    {
      id: 2,
      brand: 'Chevrolet',
      model: 'Onix',
      year: 2020,
      color: 'Vermelho',
      plate: 'ABC-1234',
      trackingSystem: 'JaburSat',
      trackingModel: 'JB-SAT-1',
      trackingSerialNumber: '123456789'
    },
    {
      id: 3,
      brand: 'Fiat',
      model: 'Uno',
      year: 2020,
      color: 'Preto',
      plate: 'ABC-1234',
      trackingSystem: 'JaburSat',
      trackingModel: 'JB-SAT-2',
      trackingSerialNumber: '123456789'
    },
    {
      id: 4,
      brand: 'Toyota',
      model: 'Corolla',
      year: 2020,
      color: 'Branco',
      plate: 'ABC-1234',
      trackingSystem: 'OmniLink',
      trackingModel: 'OM-LINK-1',
      trackingSerialNumber: '123456789'
    }
  ]
  truck = null
  isLoading = false

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: NzMessageService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.snapshot.paramMap.has('id') ? this.loadTruck() : this.createNewTruck()
  }

  loadTruck() {
    this.isLoading = true
    setTimeout(
      () => {
        this.isLoading = false
        this.truck = this.trucksList.find(truck => truck.id == +this.activatedRoute.snapshot.params.id)
      },
      666
    )
  }

  createNewTruck() {
    this.truck = {
      id: null,
      brand: '',
      model: '',
      year: null,
      color: '',
      plate: '',
      trackingSystem: '',
      trackingModel: '',
      trackingSerialNumber: ''
    }
  }

  save() {
    this.isLoading = true
    setTimeout(
      () => {
        this.isLoading = false
        this.messageService.success('As informações foram salvas com sucesso!')
      }
      ,
      666)
  }

  listTrucks() {
    this.router.navigate([ '/trucks/trucks-list' ])
  }

}
