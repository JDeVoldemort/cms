import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';


@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit{
  contacts: Contact[] = [];
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
  }
  onContactSelected(contact: Contact) {
    this.contactsService.contactSelectedEvent.emit(contact);
  }


}
