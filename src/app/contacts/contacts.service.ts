import { EventEmitter, Injectable, Output } from '@angular/core';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  @Output() contactSelectedEvent = new EventEmitter<Contact>();
  @Output() contactListChangedEvent = new EventEmitter<Contact[]>();

  constructor() {
    this.contacts = MOCKCONTACTS;
   }
  private contacts: Contact[] = [];
  getContacts() {
    return this.contacts.slice();
  }
  getContact(id: string): Contact | null {
    return this.contacts.find((c) => c.id === id);
  }
  addContact(contact: Contact) {
    if (contact === null || contact === undefined) {
      return;
    }
    this.contacts.push(contact);
    this.contactListChangedEvent.emit(this.contacts.slice());
  }
  updateContact(originalContact: Contact, newContact: Contact) {
    if (originalContact === null || originalContact === undefined || newContact === null || newContact === undefined) {
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    this.contacts[pos] = newContact;
    this.contactListChangedEvent.emit(this.contacts.slice());
  }
  deleteContact(contact: Contact) {
    if (contact === null || contact === undefined) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactListChangedEvent.emit(this.contacts.slice());
  }

}
