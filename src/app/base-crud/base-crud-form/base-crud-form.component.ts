import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import ApiService from '../../shared/services/api.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-base-crud-form',
  templateUrl: './base-crud-form.component.html',
  styleUrls: ['./base-crud-form.component.css']
})
export class BaseCrudFormComponent<T extends { id: string }> implements OnInit {
  isLoading = false;
  validateForm: FormGroup;
  resource: T;

  constructor(
    @Inject('service') protected service: ApiService<T>,
    protected message: NzMessageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadFormBuilder();
    this.loadResource();
  }

  loadFormBuilder(): void {
    throw new Error('Method not implemented.');
  }

  getId(): string {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

  loadResource(): void {
    if (this.getId()) {
      this.isLoading = true;
      this.service.get(this.getId(), ...this.additionalParams()).subscribe(resource => {
        this.resource = resource;
        this.performResourceChange();
        this.performFormGroupSetValues();
        this.isLoading = false;
      });
    }
  }

  performFormGroupSetValues(): void {
    Object.keys(this.resource).forEach(key => {
      if (this.validateForm.controls[key]) {
        this.validateForm.controls[key].setValue(this.resource[key]);
      }
    });
  }

  list(): void {
    throw new Error('Method not implemented.');
  }

  performResourceChange(): void {
  }

  save(customHandlers?: {
    success?: () => void,
    error?: (err: HttpErrorResponse) => void
  }): void {
    const {
      success = this.handleSuccess.bind(this),
      error = this.handleError.bind(this)
    } = customHandlers || {};
    if (!this.validateForm.valid) {
      console.log(this.validateForm)
      return Object.values(this.validateForm.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      });
    }

    this.isLoading = true;
    if (this.resource?.id) {
      this.service.update(this.resource.id, this.getValues(), ...this.additionalParams())
        .subscribe(() => success(), (err) => error(err));
    } else {
      this.service.save(this.getValues(), ...this.additionalParams())
        .subscribe(() => success(), (err) => error(err));
    }
  }

  protected handleSuccess(): void {
    this.message.success('Registro salvo com sucesso');
    this.list();
    this.isLoading = false;
  }

  protected handleError(): void {
    this.message.error('Ocorreu um erro ao salvar o registro');
    this.isLoading = false;
  }

  additionalParams(): any[] {
    return [];
  }

  getValues(): T {
    return this.validateForm.value;
  }
}
