import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:7778/api/todos';

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}`);
  }

  getTodo(id: string): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiUrl}/${id}`);
  }

  createTodo(todo: any): Observable<Todo> {
    return this.http.post<Todo>(`${this.apiUrl}`, todo);
  }

  updateTodo(id: string, todo: any): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/${id}`, todo);
  }

  deleteTodo(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
