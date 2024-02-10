import { Component } from '@angular/core';
import { Contact } from './contact.model';
import { ContactsService } from './contacts.service';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
selectedContact: Contact;

constructor(private contactsService: ContactsService ) { }
ngOnInit(): void {
  this.contactsService.contactSelectedEvent.subscribe(
    (contact: Contact) => {
      this.selectedContact = contact;
    }
  );
}
}
