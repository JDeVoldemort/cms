import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  @Output() documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  private documents: Document[] = [];
  private maxDocumentId: number;
  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
   }

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

  // documentChangedEvent = new EventEmitter<Document[]>();

  getMaxId(): number {
    let maxId = 0;
    for (const document of this.documents) {
      const currentId = parseInt(document.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(document: Document) {
    if (document === null || document === undefined) {
      return;
    }
    this.documents.push(document);
    this.documentListChangedEvent.next(this.documents.slice());
  }
  updateDocument(originalDocument: Document, newDocument: Document) {
    if (originalDocument === null || originalDocument === undefined || newDocument === null || newDocument === undefined) {
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.documentListChangedEvent.next(this.documents.slice());
  }


  deleteDocument(document: Document) {
    if (document === null || document === undefined) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.documentListChangedEvent.next(this.documents.slice());
  }
  }
