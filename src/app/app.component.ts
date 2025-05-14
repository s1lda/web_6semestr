import { Component, ChangeDetectionStrategy } from '@angular/core';

// Лабораторная работа 3: Добавлена стратегия OnPush 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'Tour of Heroes';
}
