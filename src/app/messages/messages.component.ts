import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MessageService } from '../message.service';
import { Observable } from 'rxjs';

// Лабораторная работа 3: Добавлена стратегия OnPush 
// Лабораторная работа 4: Переход на работу с Observable
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesComponent {
  messages$: Observable<string[]>;

  constructor(public messageService: MessageService) {
    this.messages$ = this.messageService.messages$;
  }
}
