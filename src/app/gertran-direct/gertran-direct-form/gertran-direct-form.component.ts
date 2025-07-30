import { Component, OnInit } from "@angular/core";
import { GertranDirect, GertranDirectService } from "../gertran-direct.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BaseCrudFormComponent } from "src/app/base-crud/base-crud-form/base-crud-form.component";
import { NzMessageService } from "ng-zorro-antd/message";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";

@Component({
    selector: 'gertran-direct-form',
    templateUrl: './gertran-direct-form.component.html',
    styleUrls: ['./gertran-direct-form.component.css'],
})

export class GertranDirectFormComponent extends BaseCrudFormComponent<GertranDirect> {
    isLoading = false
    validateForm: FormGroup;
    id: string | null = null;

    constructor(
        private formBuilder: FormBuilder,
        public gertranDirectService: GertranDirectService,
        message: NzMessageService,
        activatedRoute: ActivatedRoute,
        private router: Router

    ) {
        super(gertranDirectService, message, activatedRoute)
    }
isFisica = false;
isJuridica = true;



onPersonTypeChange(type: string): void {
  this.isFisica = type === 'fisica';
  this.isJuridica = type === 'juridica';

  const cnpj = this.validateForm.get('cnpj');
  const name = this.validateForm.get('name');
  const stateRegistration = this.validateForm.get('stateRegistration');
  const cpf = this.validateForm.get('cpf');

  if (this.isJuridica) {
    cnpj?.setValidators([Validators.required, Validators.pattern(/^\d{14}$/)]);
    name?.setValidators([Validators.required, Validators.maxLength(50)]);
    stateRegistration?.setValidators([Validators.required]);
    cpf?.clearValidators();
  } else {
    cpf?.setValidators([Validators.required, Validators.pattern(/^\d{11}$/)]);
    cnpj?.clearValidators();
    name?.clearValidators();
    stateRegistration?.clearValidators();
  }

  // Atualiza validações
  cnpj?.updateValueAndValidity();
  name?.updateValueAndValidity();
  stateRegistration?.updateValueAndValidity();
  cpf?.updateValueAndValidity();
}


ngOnInit(): void {
  this.validateForm = this.formBuilder.group({
    personType: ['juridica', [Validators.required]],
    cnpj: [''],
    name: [''],
    email: ['', [Validators.required, Validators.email]],
    stateRegistration: [''],
    cpf: [''],
    phone: ['', [Validators.required]],
  });

  // Atualiza campos conforme o tipo inicial
  this.onPersonTypeChange(this.validateForm.value.personType);

  // Observa mudanças no tipo
  this.validateForm.get('personType')?.valueChanges.subscribe((value) => {
    this.onPersonTypeChange(value);
  });

  this.id = this.activatedRoute.snapshot.paramMap.get('id');
  if (this.id) {
    this.loadFormData(this.id);
  }
}



    loadFormData(id: string): void {
        this.isLoading = true;
        this.gertranDirectService.get(id).subscribe({
            next: (data: GertranDirect) => {
                this.validateForm.patchValue(data);
                this.isLoading = false;
            },
            error: (error) => {
                this.message.error('Erro ao carregar dados.');
                console.error(error);
                this.isLoading = false;
            }
        });
    }

    submitForm(): void {
        if (this.validateForm.valid) {
            this.isLoading = true;
            const formData = this.validateForm.value;

            // Verifica se é criação ou edição
            const saveObservable = this.id != null
                ? this.gertranDirectService.update(this.id, formData)
                : this.gertranDirectService.save(formData);


            saveObservable.subscribe({
                next: (response) => {
                    this.message.success('Dados salvos com sucesso!');
                    this.isLoading = false;
                    if (response.id) {
                        this.router.navigate(['/gertran-direct/details', response.id]);
                    }
                },
                error: (error) => {
                    this.message.error('Erro ao salvar os dados.');
                    console.error(error);
                    this.isLoading = false;
                }
            });
        } else {
            Object.values(this.validateForm.controls).forEach((control) => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity();
                }
            });
        }
    }
}