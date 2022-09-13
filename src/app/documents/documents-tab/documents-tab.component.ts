import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { GetAllResponse } from 'src/app/shared/services/api.service';
import { OnSubmitEvent } from '../documents-form/documents-form.component';
import { Document, DocumentResource, DocumentsService } from '../documents.service';

@Component({
  selector: 'app-documents-tab',
  templateUrl: './documents-tab.component.html',
  styleUrls: ['./documents-tab.component.css']
})
export class DocumentsTabComponent implements OnInit {

  @Input() resource: DocumentResource = null;
  @Input() resourceId: string = null;

  isCreatingDocument = false;
  isLoading = false;

  documents: GetAllResponse<Document> = null;
  document: Document = null;

  constructor(
    private documentsService: DocumentsService,
    private message: NzMessageService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments(url?: string) {
    this.isLoading = true;
    this.documentsService.getAll({ url }, this.resource, this.resourceId).subscribe(documents => {
      this.documents = documents;
      this.isLoading = false;
    }, () => this.handleFailure());
  }

  save(formResult: OnSubmitEvent) {
    const body = {
      title: formResult.form.title,
      documentType: formResult.form.documentType as any,
      file: formResult.file
    };

    this.isLoading = true;

    if (this.document?.id) {
      this.documentsService.update(
        this.document.id,
        body,
        this.resource,
        this.resourceId
      ).subscribe(
        () => this.handleSuccess(),
        () => this.handleFailure()
      );
    } else {
      this.documentsService.save(
        body,
        this.resource,
        this.resourceId
      ).subscribe(
        () => this.handleSuccess(),
        () => this.handleFailure()
      );
    }
  }

  edit(document: Document) {
    this.document = document;
    this.isCreatingDocument = true;
  }

  delete(document: Document) {
    this.modal.confirm({
      nzTitle: 'Deseja realmente excluir este documento?',
      nzOnOk: () => {
        this.isLoading = true;
        this.documentsService.delete(
          document.id,
          this.resource,
          this.resourceId
        ).subscribe(
          () => this.handleSuccess(),
          () => this.handleFailure()
        );
      }
    });
  }

  private handleSuccess() {
    this.loadDocuments();
    this.isCreatingDocument = false;
    this.isLoading = false;
    this.document = null;
    this.message.success('Documento salvo com sucesso');
  }

  private handleFailure() {
    this.isCreatingDocument = false;
    this.isLoading = false;
    this.message.error('Erro ao salvar documento');
  }
}
