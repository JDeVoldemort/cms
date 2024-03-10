import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
@Injectable({
  providedIn: 'root'
})
export class DocumentsService implements OnInit{
  documents: Document[] = [];
  @Output() documentSelectedEvent = new EventEmitter<Document>();
  @Output() documentListChangedEvent = new Subject<Document[]>();
  jsonURL = 'https://api.jsonbin.io/v3/b/65ed633e266cfc3fde964772';
  private maxDocumentId: number;
  constructor(private httpClient: HttpClient) {
    // this.documents = MOCKDOCUMENTS;
    // this.getDocuments();
    this.maxDocumentId = this.getMaxId();
   }
   ngOnInit(): void {

   }
  documentsListClone: Document[];
  getDocuments() {
  this.httpClient
  .get<Document[]>(this.jsonURL, {
    headers: new HttpHeaders({
      'X-Master-Key': '$2a$10$DAYHZ66bh77uid.MiZyKc.NOdbCymJWpmExoo3kpxYPojExjDxIt.',
      'responseType': 'json'
    })})
  .subscribe((response: any) => {
    // this.documents = response.record.documents;
    this.documents = response.record;
    this.maxDocumentId = this.getMaxId();
    this.sortDocuments();
    this.documentListChangedEvent.next(this.documents.slice());
  },
  (error: any) => {
    if (error.status === 404) {
      // Handle 404 error
    } else if (error.status === 500) {
      // Handle 500 error
    } else {
      // Handle other errors
    console.log(error);
    }

  });
  return this.documents.slice();
  }


  sortDocuments(){
    this.documents.sort((a, b) => a.name.localeCompare(b.name));
  }

  storeDocuments(){
    this.httpClient
    .put(this.jsonURL, JSON.stringify(this.documents), {
      headers: new HttpHeaders({
        'X-Master-Key': '$2a$10$DAYHZ66bh77uid.MiZyKc.NOdbCymJWpmExoo3kpxYPojExjDxIt.',
        'Content-Type': 'application/json'
      })
    })
    .subscribe(() => {
      this.documentListChangedEvent.next(this.documents.slice());
    });
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
    // this.documentListChangedEvent.next(this.documents.slice());
    this.storeDocuments();
  }
  getMaxId(): number {
    let maxId = 0;
    for (let document of this.documents) {
      let currentId =+ maxId;
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
    // const documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments();
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
// this.documentListChangedEvent.next(documentsListClone);
this.storeDocuments();
}

}
