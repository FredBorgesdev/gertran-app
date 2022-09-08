import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ContactDataItem, ContactsService } from '../contacts.service';
import { Customer } from '../customers.service';

@Component({
  selector: 'app-contacts-tab',
  templateUrl: './contacts-tab.component.html',
  styleUrls: ['./contacts-tab.component.css']
})
export class ContactsTabComponent implements OnInit {

  @Input() customer: Customer

  contactsDisplayData: ContactDataItem[] = []

  isCreatingContact = false
  isLoading = false

  constructor(
    private contactsService: ContactsService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.contactsService.getAll(this.customer.id).subscribe(contacts => {
      this.contactsDisplayData = contacts
    })
  }

  addContact(contact: ContactDataItem) {
    this.isLoading = true
    this.contactsService.save(contact, this.customer.id).subscribe((contact) => {
      this.contactsDisplayData = [...this.contactsDisplayData, contact]
      this.isCreatingContact = false
      this.isLoading = false
    }, () => this.handleFailure())
  }

  edit(contact: ContactDataItem) {
  }

  delete(contact: ContactDataItem) {
  }

  private handleFailure() {
    this.message.error('Ocorreu um erro ao salvar o contato')
    this.isLoading = false
  }
}
