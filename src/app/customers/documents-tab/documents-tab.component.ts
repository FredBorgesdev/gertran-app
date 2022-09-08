import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Customer } from '../customers.service';
import { OnSubmitEvent } from '../documents-form/documents-form.component';
import { CustomerDocument, DocumentsService } from '../documents.service';

@Component({
  selector: 'app-documents-tab',
  templateUrl: './documents-tab.component.html',
  styleUrls: ['./documents-tab.component.css']
})
export class DocumentsTabComponent implements OnInit {

  @Input() customer: Customer = null
  isCreatingDocument = false
  isLoading = false

  documents: CustomerDocument[] = []
  document: CustomerDocument = null

  constructor(
    private documentsService: DocumentsService,
    private message: NzMessageService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.loadDocuments()
  }

  loadDocuments() {
    this.isLoading = true
    this.documentsService.getAll(this.customer.id).subscribe(documents => {
      this.documents = documents
      this.isLoading = false
    }, () => this.handleFailure())
  }

  save(formResult: OnSubmitEvent) {
    const body = {
      title: formResult.form.title,
      documentType: formResult.form.documentType as any,
      file: formResult.file
    }

    this.isLoading = true

    if (this.document?.id) {
      this.documentsService.update(
        this.document.id,
        body,
        this.customer.id
      ).subscribe(
        () => this.handleSuccess(),
        () => this.handleFailure()
      )
    } else {
      this.documentsService.save(
        body,
        this.customer.id
      ).subscribe(
        () => this.handleSuccess(),
        () => this.handleFailure()
      )
    }
  }

  edit(customerDocument: CustomerDocument) {
    this.document = customerDocument
    this.isCreatingDocument = true
  }

  delete(customerDocument: CustomerDocument) {
    this.modal.confirm({
      nzTitle: 'Deseja realmente excluir este documento?',
      nzOnOk: () => {
        this.isLoading = true
        this.documentsService.delete(customerDocument.id, this.customer.id).subscribe(
          () => this.handleSuccess(),
          () => this.handleFailure()
        )
      }
    })
  }

  private handleSuccess() {
    this.loadDocuments()
    this.isCreatingDocument = false
    this.isLoading = false
    this.document = null
    this.message.success('Documento salvo com sucesso')
  }

  private handleFailure() {
    this.isCreatingDocument = false
    this.isLoading = false
    this.message.error('Erro ao salvar documento')
  }
}
