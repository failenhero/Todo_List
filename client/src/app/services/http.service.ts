import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Todo from '../interfaces/todo-interface';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private readonly baseURL: string = 'https://localhost:5001/';
  private readonly getTodosUrl: string = `${this.baseURL}api/Todo`;
  private readonly addTodoUrl: string = `${this.getTodosUrl}/addnewtodo`
  private readonly removeTodosUrl: string = `${this.getTodosUrl}/delete`;

  constructor(
    private http: HttpClient
  ) { }

  getTodoList(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.getTodosUrl);
  }

  addTodo(newtodo: any) {
    return this.http.post(this.addTodoUrl, newtodo)
  }

  deleteTodo(id: number) {
    return this.http.delete(`${this.removeTodosUrl}/${id}`);
  }
}
