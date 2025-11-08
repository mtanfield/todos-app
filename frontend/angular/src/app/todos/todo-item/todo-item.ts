import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../todo.interface';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-todo-item',
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.scss',
})
export class TodoItem {
  todo = input.required<Todo>();
  onToggleCompleted = output<boolean>();
  onExecuteAction = output<'edit' | 'delete'>();

  onCompletedChanged(isChecked: boolean) {
    this.onToggleCompleted.emit(isChecked);
  }

  onAction(action: 'edit' | 'delete') {
    this.onExecuteAction.emit(action);
  }
}