import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages: Message[] = [];
  @Output() messageChangeEvent = new EventEmitter<Message[]>();
  messageListChangedEvent = new Subject<Message[]>();
  // jsonURL = 'https://api.jsonbin.io/v3/b/65ed635d266cfc3fde964779';
  jsonURL = 'http://localhost:3000/messages';
  maxMessageId: number;

  constructor(private httpClient: HttpClient) {
    // this.messages = MOCKMESSAGES;

  }
  // ngOnInit(): void {
  // }
  // this works
  // getMessages(): Message[] {
  //   this.httpClient
  //     .get<Message[]>(this.jsonURL, {
  //       headers: new HttpHeaders({
  //         'responseType': 'json'
  //       })
  //     })
  //     .subscribe(
  //       (response: Message[]) => {
  //         this.messages = response;
  //         this.maxMessageId = this.getMaxId();
  //         this.sortMessages();
  //         this.messageListChangedEvent.next(this.messages.slice());
  //       }
        // ,
        // (error) => {
        //   console.error('Error fetching messages', error);
        // }
      // );

    // return this.messages.slice();
  // }
  // getMessages(): Observable<Message[]> {
  //   return this.httpClient
  //     .get<Message[]>(this.jsonURL, {
  //       headers: new HttpHeaders({
  //         'responseType': 'json'
  //       })
  //     })
  //     .pipe(
  //       tap((response: Message[]) => {
  //         this.messages = response;
  //         this.maxMessageId = this.getMaxId();
  //         this.sortMessages();
  //         this.messageListChangedEvent.next(this.messages.slice());
  //       })
  //     );
  // }
  getMessages(): Message[] {
    this.httpClient
      .get<Message[]>(this.jsonURL)
      .subscribe((messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        this.sortMessages();
        this.messageListChangedEvent.next(this.messages.slice());
      });

    return this.messages.slice();
  }

  // getMessages() {
  // this.httpClient
  // .get<Message[]>(this.jsonURL, {
  //   headers: new HttpHeaders({
  //     'responseType': 'json'
  //   })})
  // .subscribe((response: any) => {
  //   console.log(response);
  //   // this.messages = response.record.messages;
  //   this.messages = response.record;
  //   console.log(this.messages);
  //   this.maxMessageId = this.getMaxId();
  //   this.sortMessages();
  //   this.messageListChangedEvent.next(this.messages.slice());
  // }
  // getMessages(): Observable<Message[]> {
  //   return this.httpClient.get<Message[]>(this.jsonURL).pipe(
  //     tap((response: Message[]) => {
  //       this.messages = response;
  //       this.maxMessageId = this.getMaxId();
  //       this.sortMessages();
  //       this.messageListChangedEvent.next(this.messages.slice());
  //     })
  // return this.messages.slice();

  //   );
  // // }
  // getMessages(): Promise<Message[]> {
  //   return new Promise((resolve, reject) => {
  //     this.httpClient.get<Message[]>(this.jsonURL).subscribe(
  //       (response: Message[]) => {
  //         this.messages = response;
  //         this.maxMessageId = this.getMaxId();
  //         this.sortMessages();
  //         this.messageListChangedEvent.next(this.messages.slice());
  //         resolve(this.messages.slice());
  //       }
  //     );
  //   });
  // }
  // ,
  // (error: any) => {
  //   if (error.status === 404) {
  //     // Handle 404 error
  //   } else if (error.status === 500) {
  //     // Handle 500 error
  //   } else {
  //     // Handle other errors
  //   console.log(error);
  //   }

  // }
  // );

  // return this.messages.slice();
  // }

  private sortMessages(){
    this.messages.sort((a, b) => a.id.localeCompare(b.msgText));
  }
  storeMessages(){
    this.httpClient
    .put(this.jsonURL, JSON.stringify(this.messages), {
      headers: new HttpHeaders({
        'X-Master-Key': '$2a$10$DAYHZ66bh77uid.MiZyKc.NOdbCymJWpmExoo3kpxYPojExjDxIt.',
        'Content-Type': 'application/json'
      })
    })
    .subscribe(() => {
      this.messageListChangedEvent.next(this.messages.slice());
    });
  }
  getMessage(id: string): Message {
    for (let message of this.messages) {
      if (message.id === id) {
        return message;
      }
      return null;
    }
  }
  addMessage(message: Message) {
    this.messages.push(message);
    // this.messageChangeEvent.emit(this.messages.slice());
    this.storeMessages();
  }
  getMaxId(): number {
      let maxId = 0;
    for (let message of this.messages) {
      let currentId =+ parseInt(message.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
}
