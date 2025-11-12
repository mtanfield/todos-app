import { Component, OnInit } from '@angular/core';
import { TodosService } from '../todos.service';
import { CommonModule } from '@angular/common';
import { TodoItem } from '../todo-item/todo-item';
import { Todo } from '../todo.interface';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { TodoDialog } from '../todo-dialog/todo-dialog';

@Component({
  selector: 'app-todos-list',
  imports: [CommonModule, TodoItem, MatDialogModule],
  templateUrl: './todos-list.html',
  styleUrl: './todos-list.scss',
})
export class TodosList implements OnInit {
  constructor(private todosService: TodosService, private dialog: MatDialog) { }
  todos: Todo[] = [];

  ngOnInit() {
    this.getAllTodos();
  }

  getAllTodos() {
    this.todosService.getTodos().subscribe({
      next: (todos) => {
        this.todos = todos;
      },
      error: (error) => {
        console.error("An error occurred when attempting to fetch todos: ", error);
      }
    })
  }

  handleAddTodo() {
    this.openTodoDialog();
  }

  handleToggleCompleted(id?: string, completed?: boolean) {
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
          console.error("An error occurred when attempting to update todo: ", error);
        }
      });
    }
  }

  handleAction(todo: any, action: 'edit' | 'delete') {
    if (action === 'edit') {
      this.openTodoDialog(todo);
    } else if (action === 'delete') {
      this.todosService.deleteTodo(todo.id).subscribe({
        next: () => {
          this.getAllTodos();
        },
        error: (error) => {
          console.error("An error occurred when attempting to delete todo: ", error);
        }
      });
    }
  };

  openTodoDialog(todo?: Todo) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = todo;

    this.dialog.open(TodoDialog, dialogConfig).afterClosed().subscribe(newTodo => {
      if (todo != undefined) {
        this.todosService.updateTodo(todo.id, newTodo).subscribe({
          next: () => {
            this.getAllTodos();
          },
          error: (error) => {
            console.error("An error occurred when attempting to update todo: ", error);
          }
        });
      } else if (newTodo != undefined) {
        this.todosService.createTodo(newTodo).subscribe({
          next: () => {
            this.getAllTodos();
          },
          error: (error) => {
            console.error("An error occurred when attempting to create todo: ", error);
          }
        });
      }
    });
  }
}
