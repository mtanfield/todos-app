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
    this.getAllTodos();
  }

  getAllTodos(): void {
    this.todosService.getTodos().subscribe({
      next: (todos) => {
        this.todos = todos;
      },
      error: (error) => {
        console.error(`An error occurred when attempting to fetch todos: ${error}`);
      }
    })
  }

  handleAddTodo(): void {
    console.log("Add Todo was pressed!");
  }

  handleToggleCompleted(id?: string, completed?: boolean): void {
      if (!id || completed === undefined) return;

      const todoIndex = this.todos.findIndex(t => t.id === id);
      if (todoIndex >= 0) {
        this.todosService.updateTodo(id, {
          ...this.todos[todoIndex],
          completed: completed
        }).subscribe({
          next: (todo) => {
            this.todos.splice(todoIndex, 1, todo);
          },
          error: (error) => {
            console.error(`An error occurred when attempting to update todo at ${todoIndex}: ${error}`);
          }
        });
      }
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
