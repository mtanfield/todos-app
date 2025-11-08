import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-todo-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-dialog.html',
  styleUrl: './todo-dialog.scss',
})
export class TodoDialog {
  todoForm!: FormGroup;
  todo: any;

  constructor(
    public dialogRef: MatDialogRef<TodoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.todo = data;

    this.todoForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('')
    })

    this.todoForm.setValue({
      title: data?.title ?? "",
      description: data?.description ?? ""
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  handleSave() {
    const newTodo = {
      ...this.todo,
      ...this.todoForm.value,
    };
    this.dialogRef.close(newTodo);
  }
}
