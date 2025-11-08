import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:7778/api/todos';

  getTodos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }
}
