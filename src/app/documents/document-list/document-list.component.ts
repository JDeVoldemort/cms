import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[] = [];
  subscription: Subscription;
    @Output() selectedDocumentEvent = new EventEmitter();
    constructor(private documentService: DocumentsService,
      private router: Router,
      private route: ActivatedRoute ) {}
    ngOnInit(): void {
      this.documents = this.documentService.getDocuments();
      this.subscription = this.documentService.documentListChangedEvent
        .subscribe(
          (documents: Document[]) => {
            this.documents = documents;
          }
        );
    }
    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }

    // onSelectedDocument(document: Document) {
    //   this.selectedDocumentEvent.emit(document);
    // }

    // onSelectedDocument(document: Document) {
    //   this.documentService.documentSelectedEvent.emit(document);
    // }
}
