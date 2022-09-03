import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router'
import { NzMessageService } from 'ng-zorro-antd/message'

@Component({
  selector: 'app-wagons-form',
  templateUrl: './wagons-form.component.html',
  styleUrls: ['./wagons-form.component.css']
})
export class WagonsFormComponent implements OnInit {

  wagonsList = [
    {
      id: 1,
      brand: 'Volvo',
      model: 'V70',
      year: 2019,
      color: 'Azul',
      plate: 'ABC-1234'
    },
    {
      id: 2,
      brand: 'Volvo',
      model: 'XC60',
      year: 2019,
      color: 'Vermelho',
      plate: 'ABC-1235'
    }
  ]
  wagon = null
  isLoading = false

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: NzMessageService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.snapshot.paramMap.has('id') ? this.loadWagon() : this.createNewWagon()
  }

  loadWagon() {
    const id = +this.activatedRoute.snapshot.params.id
    this.wagon = this.wagonsList.find(wagon => wagon.id == id)
  }

  createNewWagon() {
    this.wagon = {
      id: null,
      brand: '',
      model: '',
      year: null,
      color: '',
      plate: ''
    }
  }

  save() {
    this.isLoading = true
    setTimeout(
      () => {
        this.isLoading = false
        this.messageService.success('Dados salvos com sucesso!')
      }
      , 333)
  }

  listWagons() {
    this.router.navigate(['/wagons/wagons-list'])
  }

}
