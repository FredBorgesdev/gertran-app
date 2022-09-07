import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DocumentTypesService, DocumentType } from '../document-types.service';

@Component({
  selector: 'app-document-types-form',
  templateUrl: './document-types-form.component.html',
  styleUrls: ['./document-types-form.component.css']
})
export class DocumentTypesFormComponent implements OnInit {

  isLoading = false
  documentType: DocumentType = null

  validateForm: FormGroup

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private documentTypesService: DocumentTypesService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      name: [null, Validators.required],
    })
    this.loadDocumentType()
  }

  loadDocumentType() {
    if (this.activatedRoute.snapshot.paramMap.has('id')) {
      this.isLoading = true
      const id = this.activatedRoute.snapshot.paramMap.get('id')
      this.documentTypesService.get(id).subscribe(documentType => {
        this.documentType = documentType

        this.validateForm.patchValue({
          name: documentType.name,
        })

        this.isLoading = false
      })
    }
  }

  listDocumentTypes() {
    this.router.navigate(['/document-types/document-types-list'])
  }

  save() {
    if (!this.validateForm.valid) {
      Object.values(this.validateForm.controls).forEach(control => {
        if (!control.invalid) return
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      });
    }

    this.isLoading = true
    if (this.documentType?.id) {
      this.documentTypesService.update(
        this.documentType.id,
        this.validateForm.value
      ).subscribe(() => this.handleSuccess(), () => this.handleError())
    } else {
      this.documentTypesService.save(this.validateForm.value)
        .subscribe(() => this.handleSuccess(), () => this.handleError())
    }
  }

  private handleSuccess() {
    this.message.success('Seguradora salva com sucesso')
    this.listDocumentTypes()
    this.isLoading = false
  }

  private handleError() {
    this.message.error('Ocorreu um erro ao salvar a seguradora')
    this.isLoading = false
  }
}
