import { Component, Input, OnInit } from '@angular/core';

export interface ContactDataItem {
  id: number
  name: string
  email: string
  businessPhone: string
  cellphone: string
  main: boolean
}

@Component({
  selector: 'app-contacts-tab',
  templateUrl: './contacts-tab.component.html',
  styleUrls: ['./contacts-tab.component.css']
})
export class ContactsTabComponent implements OnInit {

  @Input() customerId: number

  contactsDisplayData: ContactDataItem[] = [
    {
      id: 1,
      name: 'Sérgio',
      email: 'sergio@gertran.com.br',
      businessPhone: '(31) 3333-3333',
      cellphone: '(31) 99999-9999',
      main: true
    },
    {
      id: 2,
      name: 'Fábio Arruda',
      email: 'fabio@gertran.com.br',
      businessPhone: '(31) 3333-3333',
      cellphone: '(31) 99999-9999',
      main: false
    },
    {
      id: 3,
      name: 'Rodrigo Zayit',
      email: 'rodrigo@zayit.com.br',
      businessPhone: '(31) 3333-3333',
      cellphone: '(31) 99999-9999',
      main: false
    }
  ]

  isCreatingContact = false

  constructor() { }

  ngOnInit(): void {
  }

  addContact(contact: ContactDataItem) {
    const newContact = {
      id: this.contactsDisplayData.length + 1,
      ...contact,
    }
    this.contactsDisplayData = [...this.contactsDisplayData, newContact]
    this.isCreatingContact = false
  }
}
