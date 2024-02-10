import { EventEmitter, Injectable, Output } from '@angular/core';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  @Output() contactSelectedEvent = new EventEmitter<Contact>();

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
}
