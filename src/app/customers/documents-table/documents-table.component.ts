import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CustomerDocument } from '../documents.service';

@Component({
  selector: 'app-documents-table',
  templateUrl: './documents-table.component.html',
  styleUrls: ['./documents-table.component.css']
})
export class DocumentsTableComponent implements OnInit {

  @Input() documents: CustomerDocument[] = []
  @Output() onEdit: EventEmitter<CustomerDocument> = new EventEmitter<CustomerDocument>()

  documentsOrderColumn = [
    {
      title: 'Titulo',
      compare: (a: CustomerDocument, b: CustomerDocument) => a.title.localeCompare(b.title)
    },
    {
      title: 'Tipo de documento',
      compare: (a: CustomerDocument, b: CustomerDocument) => a.documentType.name.localeCompare(b.documentType.name)
    },
    { title: 'Ações' }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  edit(document: CustomerDocument) {
    this.onEdit.emit(document)
  }

  delete() {}
}
