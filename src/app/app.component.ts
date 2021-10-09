import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TodoService} from "./todo.service";
import {Todo} from "./todo";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];

  form: FormGroup = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  constructor(private service: TodoService) {  }

  ngOnInit(): void {
    this.listAll();
  }

  private listAll() {
    this.service.listAll().subscribe(todoList => this.todos = todoList);
  }

  submit() {
    const todo: Todo = { ...this.form.value };
    this.service.save(todo).subscribe(savedTodo => {
      this.todos.push(savedTodo);
      this.form.reset();
    });
  }

  delete(todo: Todo) {
    this.service.delete(todo.id || 0).subscribe({
      next: () => this.listAll()
    });
  }

  done(todo: Todo) {
    this.service.markAsDone(todo.id || 0).subscribe({
      next: (updatedTodo) => {
        todo.done = updatedTodo.done;
        todo.doneDate = updatedTodo.doneDate;
      }
    });
  }
}
