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

  constructor() {
    this.contacts = MOCKCONTACTS;
   }
  private contacts: Contact[] = [];
  private maxContactId: number;
  getContacts() {
    return this.contacts.slice();
  }
  getContact(id: string): Contact | null {
    return this.contacts.find((c) => c.id === id);
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

  addContact(newContact: Contact) {
    if (newContact === null) {
      return;
    }

    this.maxContactId++;
    newContact.id = String(this.maxContactId);
    this.contacts.push(newContact);
    const contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
  }

  updateContact(originalContact: Contact,
            newContact: Contact) {
    if (originalContact === null || newContact === null
      || originalContact === undefined || newContact === undefined) {
      return;
    }

    newContact.id = originalContact.id;
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    this.contacts[pos] = newContact;
    const contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
  }



}
