import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { GetAllResponse, getCurrentPage } from 'src/app/shared/services/api.service';
import { Document } from '../documents.service';

@Component({
  selector: 'app-documents-table',
  templateUrl: './documents-table.component.html',
  styleUrls: ['./documents-table.component.css']
})
export class DocumentsTableComponent implements OnInit {

  @Input() documents: GetAllResponse<Document> = null;
  @Output() onEdit: EventEmitter<Document> = new EventEmitter<Document>();
  @Output() onDelete: EventEmitter<Document> = new EventEmitter<Document>();
  @Output() onPaginate: EventEmitter<string> = new EventEmitter<string>();

  documentsOrderColumn = [
    {
      title: 'Titulo',
      compare: (a: Document, b: Document) => a.title.localeCompare(b.title)
    },
    {
      title: 'Tipo de documento',
      compare: (a: Document, b: Document) => a.documentType.name.localeCompare(b.documentType.name)
    },
    { title: 'Ações' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  edit(document: Document) {
    this.onEdit.emit(document);
  }

  delete(document: Document) {
    this.onDelete.emit(document);
  }

  get page() {
    return getCurrentPage(this.documents);
  }

  handleQueryParamsChange(params: NzTableQueryParams): void {
    if (params.pageIndex < this.page) {
      this.onPaginate.emit(this.documents.previous);
    } else if (params.pageIndex > this.page) {
      this.onPaginate.emit(this.documents.next);
    }
  }
}
