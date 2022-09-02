import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-drivers-driver',
  templateUrl: './drivers-driver.component.html',
  styleUrls: ['./drivers-driver.component.css']
})
export class DriversDriverComponent implements OnInit {

  driversList = [
    {
      id: 1,
      name: 'João',
      cpf: '111.111.111-11',
      cnh: '123456789',
      cnhCategory: 'AE',
      cnhExpiration: '20/20/2020',
      cellphone: '(11) 99999-9999',
      profilePhoto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRjkIZc1kOSO-A2njZqJ_xJVBiti5XrAwVHqKsXbXqFSEioDbaZvYwteEQLITv0dV3mLs&usqp=CAU'
    },
    {
      id: 2,
      name: 'Maria',
      cpf: '222.222.222-22',
      cnh: '123456789',
      cnhCategory: 'AE',
      cnhExpiration: '20/20/2020',
      cellphone: '(11) 99999-9999',
      profilePhoto: 'https://conteudo.imguol.com.br/c/entretenimento/fc/2021/04/20/dayana-morais-da-cruz-1618961307572_v2_300x225.jpg'
    },
    {
      id: 4,
      name: 'Tobias',
      cpf: '111.111.111-11',
      cnh: '123456789',
      cnhCategory: 'AE',
      cnhExpiration: '20/20/2020',
      cellphone: '(11) 99999-9999',
      profilePhoto: ''
    },
    {
      id: 3,
      name: 'José',
      cpf: '333.333.333-33',
      cnh: '123456789',
      cnhCategory: 'AE',
      cnhExpiration: '20/20/2020',
      cellphone: '(11) 99999-9999',
      profilePhoto: 'https://img.ibxk.com.br/materias/7057/27038.jpg'
    }
  ]
  driver = null
  isLoading = false

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: NzMessageService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.snapshot.paramMap.has('id') ? this.loadDriver() : this.createNewDriver()
  }

  loadDriver() {
    this.isLoading = true
    setTimeout(() => {
      this.isLoading = false
      this.driver = this.driversList.find(
        driver => driver.id === +this.activatedRoute.snapshot.paramMap.get('id')
      )
    }, 666)
  }

  createNewDriver() {
    this.driver = {
      id: null,
      name: '',
      cpf: '',
      cnh: '',
      cnhCategory: '',
      cnhExpiration: '',
      cellphone: '',
      profilePhoto: ''
    }
  }

  onSubmit(value: any) {
    this.isLoading = true
    setTimeout(() => {
      this.isLoading = false
      this.messageService.success('As informações foram salvas com sucesso!')
    }, 666)
  }

  listDrivers() {
    this.router.navigate(['/drivers/drivers-list'])
  }

}
