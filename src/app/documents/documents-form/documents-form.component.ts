import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentTypesService, DocumentType } from 'src/app/document-types/document-types.service';
import { Document } from '../documents.service';

export interface OnSubmitEvent {
  form: Document;
  file: File;
}

@Component({
  selector: 'app-documents-form',
  templateUrl: './documents-form.component.html',
  styleUrls: ['./documents-form.component.css']
})
export class DocumentsFormComponent implements OnInit {

  @Input() document: Document = null;
  @Input() isVisible = false;
  @Output() onSubmit: EventEmitter<OnSubmitEvent> = new EventEmitter<OnSubmitEvent>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  documentTypes: DocumentType[] = [];
  validateForm: FormGroup;
  file: File = null;

  constructor(
    private documentTypeService: DocumentTypesService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.documentTypeService.getAll({ url: '' }).subscribe(documentTypes => {
      this.documentTypes = documentTypes.results;
    });

    this.validateForm = this.formBuilder.group({
      title: [this.document?.title, [Validators.required]],
      documentType: [this.document?.documentType.id, [Validators.required]],
    });
  }

  handleOk(): void {
    if (this.validateForm.valid) {
      this.onSubmit.emit({
        form: this.validateForm.value,
        file: this.file
      });
    } else {
      Object.keys(this.validateForm.controls).forEach(key => {
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      });
    }
  }

  handleCancel(): void {
    this.onCancel.emit();
  }

  beforeUpload = (file: File) => {
    this.file = file;
    return false;
  }
}
