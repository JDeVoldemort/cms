import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactsService implements OnInit{
  @Output() contactSelectedEvent = new EventEmitter<Contact>();
  @Output() contactListChangedEvent = new Subject<Contact[]>();
  jsonURL = 'https://api.jsonbin.io/v3/b/65ed63501f5677401f3b5d9b';
  // jsonURL = 'https://api.jsonbin.io/v3/b/65ed19a6dc74654018b0b407';
  headers = new HttpHeaders({'X-Master-Key': '$2a$10$DAYHZ66bh77uid.MiZyKc.NOdbCymJWpmExoo3kpxYPojExjDxIt.'});

  constructor(private httpClient: HttpClient) {
    // this.contacts = MOCKCONTACTS;
    // this.maxContactId = this.getMaxId();
   }
  private contacts: Contact[] = [];
  private maxContactId: number;

  ngOnInit() {
  }
  getContacts() {
    this.httpClient
      .get<Contact[]>(this.jsonURL, {
        headers: new HttpHeaders({
          'X-Master-Key': '$2a$10$DAYHZ66bh77uid.MiZyKc.NOdbCymJWpmExoo3kpxYPojExjDxIt.',
          'responseType': 'json'
        })
      })
      .subscribe((response: any) => {
        this.contacts = response.record.contacts;
        console.log(this.contacts);
        this.maxContactId = this.getMaxId();
        this.sortContacts();
        this.contactListChangedEvent.next(this.contacts.slice());

      },
      (error: any) => {
        if (error.status === 404) {
          // Handle 404 error
        } else if (error.status === 500) {
          // Handle 500 error
        } else {
          // Handle other errors
        console.log(error);
        }

      }
      );



      return this.contacts.slice();
    }
  private sortContacts(){
    this.contacts.sort((a, b) => a.name.localeCompare(b.name));
  }

    storeContacts(){
      this.httpClient
      .put(this.jsonURL, JSON.stringify(this.contacts), {
        headers: new HttpHeaders({
          'X-Master-Key': '$2a$10$DAYHZ66bh77uid.MiZyKc.NOdbCymJWpmExoo3kpxYPojExjDxIt.',
          'Content-Type': 'application/json'
        })
      })
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
    // this.contactListChangedEvent.next(this.contacts.slice());
    this.storeContacts();
  }

  addContact(newContact: Contact) {
    if (newContact === null) {
      return;
    }

    this.maxContactId++;
    newContact.id = String(this.maxContactId);
    this.contacts.push(newContact);
    const contactsListClone = this.contacts.slice();
    // this.contactListChangedEvent.next(contactsListClone);
    this.storeContacts();
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
    // this.contactListChangedEvent.next(contactsListClone);
    this.storeContacts();
  }



}
