import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  @Output() documentSelectedEvent = new EventEmitter<Document>();
  @Output() documentListChangedEvent = new Subject<Document[]>();
  private maxDocumentId: number;
  constructor() {
    this.documents = MOCKDOCUMENTS;
    // this.getDocuments();
    this.maxDocumentId = this.getMaxId();
   }
  documents: Document[] = [];
  documentsListClone: Document[];
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
    this.documentListChangedEvent.next(this.documents.slice());
  }
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


  addDocument(newDocument: Document) {
    if (newDocument === null) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = String(this.maxDocumentId);
    this.documents.push(newDocument);
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }
  updateDocument (originalDocument: Document,
    newDocument: Document) {
    if (originalDocument === null || newDocument === null
      || originalDocument === undefined || newDocument === undefined) {
    return;
    }

newDocument.id = originalDocument.id;
const pos = this.documents.indexOf(originalDocument);
if (pos < 0) {
return;
}

this.documents[pos] = newDocument;
const documentsListClone = this.documents.slice();
this.documentListChangedEvent.next(documentsListClone);
}

}
