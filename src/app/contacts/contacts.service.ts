import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  @Output() contactSelectedEvent = new EventEmitter<Contact>();
  @Output() contactListChangedEvent = new Subject<Contact[]>();
  private contacts: Contact[] = [];
  private maxContactId: number;
  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
   }
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
    this.contactListChangedEvent.next(this.contacts.slice());
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
    this.contactListChangedEvent.next(this.contacts.slice());
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
    this.contactListChangedEvent.next(this.contacts.slice());
  }
  getMaxId(): number {
    let maxId = 0;
    for (const contact of this.contacts) {
      const currentId = parseInt(contact.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

}
