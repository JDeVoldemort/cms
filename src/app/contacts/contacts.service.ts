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
  // jsonURL = 'https://api.jsonbin.io/v3/b/65ed63501f5677401f3b5d9b';
  // jsonURL = 'https://api.jsonbin.io/v3/b/65ed19a6dc74654018b0b407';
  jsonURL = 'http://localhost:3000/contacts';
  // headers = new HttpHeaders({'X-Master-Key': '$2a$10$DAYHZ66bh77uid.MiZyKc.NOdbCymJWpmExoo3kpxYPojExjDxIt.'});

  contacts: Contact[] = [];
  maxContactId: number;
  contactsListClone: Contact[]

  constructor(private httpClient : HttpClient) {
  }
  ngOnInit(){

  }

  getContacts() {
    this.httpClient
      .get<Contact[]>(this.jsonURL)
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.sortContacts();
        this.contactListChangedEvent.next(this.contacts.slice());
      });

    return this.contacts.slice();
  }

  private sortContacts(){
    this.contacts.sort((a, b) => a.name.localeCompare(b.name));
  }

  storeContacts(){
    this.httpClient
    .put(this.jsonURL, JSON.stringify(this.contacts), {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    })
    .subscribe(() =>{
      this.sortContacts;
      this.contactListChangedEvent.next(this.contacts.slice());
    });
  }


  getContact(id: string){
    return this.contacts[id];
  }

  getMaxId(): number {
    let maxId = 0;
    for (let contact of this.contacts){
      let currentId =+ maxId;
      if(currentId > maxId){
        maxId = currentId;
      }
    }
    return maxId;

  }

  addContact(newContact: Contact){
    if (!newContact) return;
    newContact.id = '';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.httpClient
      .post<{ message: string; contact: Contact }>(
        this.jsonURL,
        newContact,
        { headers: headers }).subscribe({
          next: (res) => {
            console.log(res.message);
            this.contacts.push(res.contact);
            this.sortContacts();
          }
        })

  }


  updateContact(originalContact: Contact, newContact: Contact){
    if (!originalContact || !newContact){
      return
    }
    let pos = this.contacts.indexOf(originalContact)
    if (pos < 0 ){
      return
    }

    newContact.id = originalContact.id
    this.contacts[pos] = newContact
    this.storeContacts();

  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);

    if (pos < 0) {
      return;
    }

    this.httpClient.delete(`${this.jsonURL}/${contact.id}`)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(pos, 1);
          this.sortContacts();
        }
      )

  }



}
