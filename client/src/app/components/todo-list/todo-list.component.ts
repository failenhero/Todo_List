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
  public DoneList = [] as Todo[];
  public addTodoForm!: FormGroup;

  public inputValue: string = '';

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
      this.DoneList = res.filter(done => done.isDone == true);
    }, error => {
      console.log(error)
    });
  }

  deleteTodo(id: number) {
    this.httpService.deleteTodo(id).subscribe(res => {
      this.getTodoList();
    });
  }

  markAsImportant(todo: Todo) {
    let newImportantStatus: boolean = !todo.isImportant;

    let newTodo = {
      id: todo.id,
      text: todo.text,
      isImportant: newImportantStatus,
      isDone: todo.isDone
    };

    this.httpService.putTodo(newTodo).subscribe(res => {
      this.getTodoList();
    })
  }

  addTodo() {
    let newTodo = {
      Text:this._newTodoName
    }

    this.addTodoForm.reset();

    this.httpService.addTodo(newTodo).subscribe(res => {
      this.getTodoList();
    });
  }

  changeDoneStatus(todo: Todo) {
    let newDoneStatus: boolean = !todo.isDone;

    let newTodo = {
      id: todo.id,
      text: todo.text,
      isImportant: todo.isImportant,
      isDone: newDoneStatus
    };

    this.httpService.putTodo(newTodo).subscribe(res => {
      this.getTodoList();
    })
  }

  get _newTodoName() {
    return this.addTodoForm.get('todoName')?.value;
  }
}
