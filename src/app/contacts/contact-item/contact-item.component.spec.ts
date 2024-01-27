import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactContactItemComponent } from './contact.contact-item.component';

describe('ContactContactItemComponent', () => {
  let component: ContactContactItemComponent;
  let fixture: ComponentFixture<ContactContactItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactContactItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactContactItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
