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
  getDocument(id: string): Document {
    return this.documents.find((d) => d.id === id);
  }
}
