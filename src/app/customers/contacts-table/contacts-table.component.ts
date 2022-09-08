import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ContactDataItem } from '../contacts.service';

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.css']
})
export class ContactsTableComponent implements OnInit {

  @Input() contacts: ContactDataItem[] = [];
  @Output() onEdit: EventEmitter<ContactDataItem> = new EventEmitter<ContactDataItem>()
  @Output() onDelete: EventEmitter<ContactDataItem> = new EventEmitter<ContactDataItem>()

  contactsOrderColumn = [
    {
      title: 'Nome do contato',
      compare: (a: ContactDataItem, b: ContactDataItem) => a.name.localeCompare(b.name)
    },
    { title: 'Email' },
    { title: 'Telefone comercial' },
    { title: 'Telefone celular' },
    { title: 'Principal' },
    { title: 'Ações' }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  edit(item: ContactDataItem) {
    this.onEdit.emit(item)
  }

  delete(item: ContactDataItem) {
    this.onDelete.emit(item)
  }

}
