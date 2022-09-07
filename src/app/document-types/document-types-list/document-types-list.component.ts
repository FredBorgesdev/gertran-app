import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DocumentType, DocumentTypesService } from '../document-types.service';

@Component({
  selector: 'app-document-types-list',
  templateUrl: './document-types-list.component.html',
  styleUrls: ['./document-types-list.component.css']
})
export class DocumentTypesListComponent implements OnInit {

  isLoading = false
  documentTypes: DocumentType[] = []

  documentTypesColumns = [
    { title: 'ID' },
    {
      title: 'Nome',
      compare: (
        a: DocumentType,
        b: DocumentType
      ) => a.name.localeCompare(b.name),
    },
    { title: 'Ações' },
  ]

  constructor(
    private documentTypesService: DocumentTypesService,
    private router: Router,
    private modal: NzModalService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.isLoading = true
    this.documentTypesService.getAll().subscribe((data) => {
      this.documentTypes = data
      this.isLoading = false
    }, () => this.handleError())
  }

  create() {
    this.router.navigate(['document-types/document-types-create'])
  }

  edit(documentType: DocumentType) {
    this.router.navigate([
      'document-types',
      'document-types-edit',
      documentType.id,
    ])
  }

  delete(documentType: DocumentType) {
    this.modal.confirm({
      nzTitle: 'Deseja realmente excluir?',
      nzContent: 'Essa ação não poderá ser desfeita',
      nzOkText: 'Sim',
      nzOnOk: () => this.deleteDocumentType(documentType.id),
    })
  }

  deleteDocumentType(id: string) {
    this.isLoading = true
    this.documentTypesService.delete(id).subscribe(() => {
      this.documentTypes = this.documentTypes.filter(
        (documentType) => documentType.id !== id
      )
      this.message.success('Tipo de document excluída com sucesso')
      this.isLoading = false
    }, () => {
      this.message.error('Erro ao excluir tipo de documento')
      this.isLoading = false
    })
  }

  private handleError() {
    this.message.error('Erro ao carregar tipos de documentos')
    this.isLoading = false
  }
}
