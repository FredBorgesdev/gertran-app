import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../documents.service';

@Component({
  selector: 'app-documents-table',
  templateUrl: './documents-table.component.html',
  styleUrls: ['./documents-table.component.css']
})
export class DocumentsTableComponent implements OnInit {

  @Input() documents: Document[] = []
  @Output() onEdit: EventEmitter<Document> = new EventEmitter<Document>()
  @Output() onDelete: EventEmitter<Document> = new EventEmitter<Document>()

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
  ]

  constructor() { }

  ngOnInit(): void {
  }

  edit(document: Document) {
    this.onEdit.emit(document)
  }

  delete(document: Document) {
    this.onDelete.emit(document)
  }
}
