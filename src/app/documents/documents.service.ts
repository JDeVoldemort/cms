import { EventEmitter, Injectable, Output } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  @Output() documentSelectedEvent = new EventEmitter<Document>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
   }
  private documents: Document[] = [];
  getDocuments() {
    return this.documents.slice();
  }
  getDocument(id: string): Document | null{
    for (const document of this.documents){
      if(document.id === id){
        return document;
      }
    }
    return null;
  }

  documentChangedEvent = new EventEmitter<Document[]>();

  deleteDocument(document: Document) {
    if (document === null || document === undefined) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documents.slice());
  }
  }
