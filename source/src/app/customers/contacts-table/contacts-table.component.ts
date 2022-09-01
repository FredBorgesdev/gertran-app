import { Component, Input, OnInit } from '@angular/core';
import { ContactDataItem } from '../contacts-tab/contacts-tab.component';

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.css']
})
export class ContactsTableComponent implements OnInit {

  @Input() contacts: ContactDataItem[];

  contactsOrderColumn = [
    {
      title: 'ID',
      compare: (a: ContactDataItem, b: ContactDataItem) => a.id - b.id,
    },
    {
      title: 'Nome do contato',
      compare: (a: ContactDataItem, b: ContactDataItem) => a.name.localeCompare(b.name)
    },
    {
      title: 'Email'
    },
    {
      title: 'Telefone comercial'
    },
    {
      title: 'Telefone celular'
    },
    {
      title: 'Principal'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  contactsEdit(item: ContactDataItem) {
    console.log('edit')
  }

}
