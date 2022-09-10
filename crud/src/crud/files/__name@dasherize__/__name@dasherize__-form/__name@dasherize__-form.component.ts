import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { <%= classify(name) %>Service, <%= classify(name) %> } from '../<%= dasherize(name) %>.service';

@Component({
  selector: 'app-<%= dasherize(name) %>-form',
  templateUrl: './<%= dasherize(name) %>-form.component.html',
  styleUrls: ['./<%= dasherize(name) %>-form.component.css'],
})
export class <%= classify(name) %>FormComponent implements OnInit {
  isLoading = false
  <%= camelize(name) %>: <%= classify(name) %> = null

  validateForm: FormGroup

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private service: <%= classify(name) %>Service,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
    })
    this.load<%= classify(name) %>()
  }

  load<%= classify(name) %>() {
    if (this.activatedRoute.snapshot.paramMap.has('id')) {
      this.isLoading = true
      const id = this.activatedRoute.snapshot.paramMap.get('id')
      this.service.get(id).subscribe(<%= camelize(name) %> => {
        this.<%= camelize(name) %> = <%= camelize(name) %>

        this.validateForm.patchValue({
        })

        this.isLoading = false
      })
    }
  }

  list() {
    this.router.navigate(['/<%= dasherize(name) %>/<%= dasherize(name) %>-list'])
  }

  save() {
    if (!this.validateForm.valid) {
      Object.values(this.validateForm.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      });
    }

    this.isLoading = true
    if (this.<%= camelize(name) %>?.id) {
      this.service.update(
        this.<%= camelize(name) %>.id,
        this.validateForm.value
      ).subscribe(() => this.handleSuccess(), () => this.handleError())
    } else {
      this.service.save(this.validateForm.value)
        .subscribe(() => this.handleSuccess(), () => this.handleError())
    }
  }

  private handleSuccess() {
    this.message.success('Registro salvo com sucesso')
    this.list()
    this.isLoading = false
  }

  private handleError() {
    this.message.error('Ocorreu um erro ao salvar o registro')
    this.isLoading = false
  }
}
