import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  // document: Document[] = []
  documents: Document[] = []
  private subscription: Subscription

  constructor(private documentService: DocumentsService,
              private router: Router,
              private route: ActivatedRoute){
  }

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
    this.subscription = this.documentService.documentListChangedEvent
      .subscribe(
        (documentsList: Document[]) => {
          this.documents = documentsList;
          console.log(this.documents);
        }
      );
  }
  // ngOnInit(){
  //   this.document = this.documentService.getDocuments();


  //   this.subscription = this.documentService.documentListChangedEvent
  //   .subscribe((documentList: Document[]) => {
  //     this.document = documentList
  //   })
  // }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
