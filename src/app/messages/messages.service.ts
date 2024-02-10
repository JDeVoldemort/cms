import { EventEmitter, Injectable, Output } from '@angular/core';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages: Message[] = [];
  @Output() messageChangeEvent = new EventEmitter<Message[]>();

  constructor() {
    this.messages = MOCKMESSAGES;
  }
  getMessages() {
    return this.messages.slice();
  }
  getMessage(id: string): Message {
    return this.messages.find((m) => m.id === id);
  }
  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangeEvent.emit(this.messages.slice());
  }
}
