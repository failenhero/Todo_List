import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Todo from 'src/app/interfaces/todo-interface';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  public TodoList = [] as Todo[];
  public addTodoForm!: FormGroup;

  constructor(
    private httpService: HttpService
  ) {

  }

  ngOnInit(): void {
    this.getTodoList();
    this.initForm();
  }

  initForm() {
    this.addTodoForm = new FormGroup({
      todoName: new FormControl('', [
        Validators.required
      ])
    });
  }

  getTodoList(){
    this.httpService.getTodoList().subscribe(res => {
      console.log(res);
      this.TodoList = res;
    }, error => {
      console.log(error)
    });
  }

  deleteTodo(id: number) {
    this.httpService.deleteTodo(id).subscribe(res => {
      this.getTodoList();
    });
  }

  addTodo() {
    let newTodo = {
      Text:this._newTodoName
    }

    this.httpService.addTodo(newTodo).subscribe(res => {
      this.getTodoList();
    });
  }

  get _newTodoName() {
    return this.addTodoForm.get('todoName')?.value;
  }
}
