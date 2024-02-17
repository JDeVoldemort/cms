import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';
@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent {
  contact: Contact;
  id: string;
  constructor(private contactService: ContactsService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

ngOnInit() {
  this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.contact = this.contactService.getContact(this.id);
      }
    );
}
onDelete() {
  this.contactService.deleteContact(this.contact);
  this.router.navigate(['/contacts']);
}
}
