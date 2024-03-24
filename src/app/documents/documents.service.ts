import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  documents: Document[] = [];
  @Output() documentSelectedEvent = new EventEmitter<Document>();
  @Output() documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>()

  // jsonURL = 'https://api.jsonbin.io/v3/b/65ed633e266cfc3fde964772';
  jsonURL = 'http://localhost:3000/documents';
  private maxDocumentId: number;
  constructor(private httpClient: HttpClient) {
    this.maxDocumentId = this.getMaxId();
  }


  getDocuments(): Document[] {
    this.httpClient
      .get<Document[]>(this.jsonURL)
      .subscribe((documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.sortDocuments();
        this.documentListChangedEvent.next([...this.documents.slice()]);
        // this.documentListChangedEvent.next(JSON.stringify(this.documents.slice())); // Send as JSON string

      });
console.log(this.documents)
console.log(this.documents.slice())
// this.documents = JSON.stingify(this.documents)
let docs = JSON.stringify(this.documents)
console.log(JSON.stringify(this.documents));
// docs = JSON.parse(docs).
    return this.documents.slice();
    // return docs;
  }

  private sortDocuments() {
    this.documents.sort((a, b) => a.name.localeCompare(b.name));
  }

  storeDocuments() {
    this.httpClient
      .put(this.jsonURL, JSON.stringify(this.documents), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .subscribe(() => {
        this.sortDocuments;
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }


  getDocument(id: string) {

    // console.log(this.documents.find(d => d.id === id));
    return this.documents.find(d => d.id === id);
  }
  // getDocument(id: string): Observable<Document> {
  //   return this.httpClient.get<Document>(`${this.jsonURL}/${id}`);
  // }

  getMaxId(): number {
    let maxId = 0;
    for (let document of this.documents) {
      let currentId = + maxId;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;

  }

  addDocument(newDocument: Document) {
    if (!newDocument) return;
    newDocument.id = '';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.httpClient
      .post<{ message: string; document: Document }>(
        this.jsonURL,
        newDocument,
        { headers: headers }).subscribe({
          next: (res) => {
            console.log(res.message);
            this.documents.push(res.document);
            this.sortDocuments();
          }
        })
  }


  updateDocument(originalDocument: Document, newDocument: Document) {
    // Check if originalDocument or newDocument is missing
    if (!originalDocument || !newDocument) {
      return;
    }

    // Find the position of the original document in the documents array
    const pos = this.documents.findIndex(d => d.id === originalDocument.id);

    // If original document not found, return
    if (pos < 0) {
      return;
    }

    // Set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    newDocument._id = originalDocument._id;

    // Define headers for HTTP request
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // Update database by sending HTTPl PUT request
    this.httpClient.put(`${this.jsonURL}/${newDocument.id}`,
      newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          // If update successful, update local documents array
          this.documents[pos] = newDocument;
          // Sort and send documents
          this.sortDocuments();
        }
      );
  }



  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);

    if (pos < 0) {
      return;
    }

    this.httpClient.delete(`${this.jsonURL}/${document.id}`)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
          this.sortDocuments();
        }
      )

  }




}
