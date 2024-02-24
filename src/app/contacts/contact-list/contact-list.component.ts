import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';


@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit{
  contacts: Contact[] = [];
  subsciption: Subscription

// @Output() selectedContactEvent = new EventEmitter<Contact>();
// onSelected(contact: Contact) {
//   this.selectedContactEvent.emit(contact);
// }

onSelected(contact: Contact) {
  this.contactsService.contactSelectedEvent.emit(contact);
}
  constructor(private contactsService: ContactsService ) { }
  ngOnInit(): void {
    this.contacts = this.contactsService.getContacts();
    this.subsciption = this.contactsService.contactListChangedEvent
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
        }
      );
  }
  ngOnDestroy(): void {
    this.subsciption.unsubscribe();
  }
  // onContactSelected(contact: Contact) {
  //   this.contactsService.contactSelectedEvent.emit(contact);
  // }


}
