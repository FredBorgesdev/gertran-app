import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Driver, DriversService} from '../drivers.service';

@Component({
  selector: 'app-drivers-driver',
  templateUrl: './drivers-driver.component.html',
  styleUrls: ['./drivers-driver.component.css']
})
export class DriversDriverComponent implements OnInit {

  driver = null;
  isLoading = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: NzMessageService,
    private message: NzMessageService,
    private driversService: DriversService,
  ) {
  }

  ngOnInit(): void {
    this.loadDriver();
  }

  loadDriver() {
    this.isLoading = true;
    if (this.activatedRoute.snapshot.paramMap.has('id')) {
      this.driversService.get(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(driver => {
        this.driver = driver;
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
      });
    } else {
      this.createNewDriver();
      this.isLoading = false;
    }
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
    };
  }

  submitForm(value: Driver): void {
    this.isLoading = true;

    if (this.driver?.id) {
      this.driversService.update(this.driver.id, value).subscribe(
        () => this.handleSuccess(),
        () => this.handleFailure()
      );
    } else {
      this.driversService.save(value).subscribe(
        ({id}) => this.handleSuccess(id),
        () => this.handleFailure()
      );
    }
  }


  changePassword(password: string) {
    console.log(password)
    this.driversService.changePassword(this.driver.id, password).subscribe(() => {
      this.message.success('Senha alterada com sucesso!');
    }, () => {
      this.message.error('Não foi possível alterar a senha. Tente novamente.');
    });
  }



  changeDriver(value: Driver): void {
    console.log(value)
    this.driver = value;
  }

  listDrivers() {
    this.router.navigate(['/drivers/drivers-list']);
  }

  private handleSuccess(id?: string) {
    this.isLoading = false;
    this.messageService.success('Motorista salvo com sucesso');

    if (id) {
      this.router.navigate(['/drivers/driver-edit', id]);
    } else {
      this.listDrivers();
    }
  }

  private handleFailure() {
    this.isLoading = false;
    this.messageService.error('Erro ao salvar motorista');
  }

}
