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
    ngOnInit(): void {
        this.validateForm = this.formBuilder.group({
            cnpj: ['', [Validators.required, Validators.pattern(/^\d{14}$/)]],
            name: ['', [Validators.required, Validators.maxLength(50)]],
            email: ['', [Validators.required, Validators.email]],
            stateRegistration: ['', [Validators.required]],
            cpf: ['', [Validators.required]],
            phone: ['', [Validators.required]],
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