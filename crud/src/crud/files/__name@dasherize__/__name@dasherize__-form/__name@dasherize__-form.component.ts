import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { <%= classify(name) %>Service, <%= classify(name) %> } from '../<%= dasherize(name) %>.service';
import { BaseCrudFormComponent } from '../../base-crud/base-crud-form/base-crud-form.component';

@Component({
  selector: 'app-<%= dasherize(name) %>-form',
  templateUrl: './<%= dasherize(name) %>-form.component.html',
  styleUrls: ['./<%= dasherize(name) %>-form.component.css'],
})
export class <%= classify(name) %>FormComponent extends BaseCrudFormComponent<<%= classify(name) %>> {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    activatedRoute: ActivatedRoute,
    service: <%= classify(name) %>Service,
    message: NzMessageService,
  ) {
    super(
      service,
      message,
      activatedRoute,
    );
  }

  loadFormBuilder(): void {
    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      peripheralType: [null, [Validators.required]],
    });
  }

  list(): void {
    this.router.navigate(['/<%= dasherize(name) %>/<%= dasherize(name) %>-list']);
  }
}
