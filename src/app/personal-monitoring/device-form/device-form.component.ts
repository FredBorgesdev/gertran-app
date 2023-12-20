import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {PersonalMonitoringService, PersonalMonitoring, User} from '../personal-monitoring.service';
import { UsersService } from 'src/app/users/users.service';
import { SelectableUsersService } from 'src/app/users/selectable-users.service';

@Component({
  selector: 'device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.css']
})
export class PersonalMonitoringFormComponent implements OnInit {

  isLoading = false;
  personalMonitoring: PersonalMonitoring = null;
  usersNextUrl: string;
  user: User;
  validateForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private personalMonitoringService: PersonalMonitoringService,
    private message: NzMessageService,
    public selectableUsersService: SelectableUsersService,
    private usersService: UsersService,
  ) {
  }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      id: [null, [Validators.required]],
      pkId: [null, [Validators.required]],
      user:[null, [Validators.required]],
    });
    this.loadPersonalMonitoring();
    this.selectableUsersService.init();

  }

  loadPersonalMonitoring() {
    if (this.activatedRoute.snapshot.paramMap.has('id')) {
      this.isLoading = true;
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.personalMonitoringService.get(id).subscribe(personalMonitoring => {
        this.personalMonitoring = personalMonitoring;
          if(personalMonitoring.user!=null){
            this.usersService.get(this.personalMonitoring.user.id).subscribe(userDetails => {
              this.user = userDetails
              this.validateForm.patchValue({
                id: personalMonitoring.id,
                pkId: personalMonitoring.pkId,
                // user: {
                //   id: userDetails.id,
                //   name: userDetails.name, // Adicione outros campos conforme necessário
                //   // ...
                // }
              });
            });
          }else{
              this.validateForm.patchValue({
                id: personalMonitoring.id,
                pkId: personalMonitoring.pkId,
              });
          }
        this.isLoading = false;
      });
    }
  }
  

  listPersonalMonitoring() {
    this.router.navigate(['device/devices-list']);
  }

  save() {
    if (!this.validateForm.valid) {
      Object.values(this.validateForm.controls).forEach(control => {
        if (!control.invalid) {
          return;
        }
        control.markAsDirty();
        control.updateValueAndValidity({onlySelf: true});
      });
    }

    this.isLoading = true;
    if (this.personalMonitoring?.id) {
      this.personalMonitoringService.update(
        this.personalMonitoring.id,
        this.validateForm.value
      ).subscribe(() => this.handleSuccess(), () => this.handleError());
    } else {
      this.personalMonitoringService.save(this.validateForm.value)
        .subscribe(() => this.handleSuccess(), () => this.handleError());
    }
  }

  private handleSuccess() {
    this.message.success('Dispositivo salvo com sucesso');
    this.listPersonalMonitoring();
    this.isLoading = false;
  }

  private handleError() {
    this.message.error('Ocorreu um erro ao salvar o dispositivo');
    this.isLoading = false;
  }
}
