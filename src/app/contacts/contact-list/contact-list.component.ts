import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';


@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit, OnDestroy{
  contacts: Contact[] = [];
  subsciption: Subscription;
  term: string;

// @Output() selectedContactEvent = new EventEmitter<Contact>();
// onSelected(contact: Contact) {
//   this.selectedContactEvent.emit(contact);
// }

onSelected(contact: Contact) {
  this.contactsService.contactSelectedEvent.emit(contact);
}
  constructor(private contactsService: ContactsService ) { }
  onkeypress(value: string) {
    this.term = value;
  }
  ngOnInit(): void {

    this.contacts = this.contactsService.getContacts();
    // this.contactsService.getContacts().subscribe((contacts: Contact[]) => {
    //   this.contacts = contacts;
    // });
    this.subsciption = this.contactsService.contactListChangedEvent
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
        }
      );
  }
ngOnDestroy() {
  this.subsciption.unsubscribe();
}
  // onContactSelected(contact: Contact) {
  //   this.contactsService.contactSelectedEvent.emit(contact);
  // }
  OnCancel() {
    this.term = '';
  }
search(value: string) {
  this.term = value;
}

}
