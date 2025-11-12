import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosList } from './todos/todos-list/todos-list';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TodosList
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
