import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../../contacts/contact.model';
import { ContactsService } from '../../contacts/contacts.service';
import { Message } from '../message.model';


@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css'
})
export class MessageItemComponent implements OnInit{
  contact: Contact;
  contacts: Contact[];
  subsciption: Subscription;
    @Input() message: Message;
  messageSender: string;
  constructor(private contactsService: ContactsService) {
    contact: Contact;

  }
  ngOnInit() {
    this.contacts = this.contactsService.getContacts();
    this.subsciption = this.contactsService.contactListChangedEvent
    .subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    );

    // let senderid = this.message.sender;
// let sender = toString(senderid);
     const contact = this.contactsService.getContact(this.message.sender);
     console.log(contact);
     console.log(this.message);
     console.log(this.message.sender);
     console.log(contact);
     this.messageSender = contact.name;
  }
}
