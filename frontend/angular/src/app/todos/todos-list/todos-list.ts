import { Component, OnInit } from '@angular/core';
import { TodosService } from '../todos.service';
import { CommonModule } from '@angular/common';
import { TodoItem } from '../todo-item/todo-item';
import { Todo } from '../todo.interface';

@Component({
  selector: 'app-todos-list',
  imports: [CommonModule, TodoItem],
  templateUrl: './todos-list.html',
  styleUrl: './todos-list.scss',
})
export class TodosList implements OnInit {
  constructor(private todosService: TodosService) {}
  todos: Todo[] = [];

  ngOnInit(): void {
    this.todosService.getTodos().subscribe({
      next: (todos) => {
        this.todos = todos;
        console.log(`Got todos: ${JSON.stringify(todos, null, 2)}`);
      },
      error: (error) => {
        console.log(`An error occurred when attempting to fetch todos: ${error}`);
      }
    })
  }

  handleAddTodo(): void {
    console.log("Add Todo was pressed!");
  }

  handleToggleCompleted(id?: string, completed?: boolean): void {
      if (!id || completed === undefined) return;

      console.log(`Toggling completed of todo ${id} to ${completed}`);

      // const todo = todos.find(t => t.id === id);
      // if (todo) {
      //     updateTodo({ ...todo, completed });
      // }
  }

  handleAction(todo: any, action: 'edit' | 'delete'): void {
      if (action === 'edit') {
        console.log(`Editing todo: ${todo.id}`);
          // setEditingTodo(todo);
          // setIsDialogOpen(true);
      } else if (action === 'delete') {
        console.log(`Attempting to delete todo: ${todo.id}`);
          // deleteTodo(todo.id);
      }
  };
}
