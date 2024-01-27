import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent implements OnInit{

  messages: Message[] = [
    new Message('1', 'Hello there', 'This is a test', 'Jd'),
    new Message('2', 'Hello there', 'This is a test2', 'Jd'),
    new Message('3', 'Hello there', 'This is a test3', 'Jd')
  ];
  constructor() { }
  ngOnInit(): void {
  }
  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
