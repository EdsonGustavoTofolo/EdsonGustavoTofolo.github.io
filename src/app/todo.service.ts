import { Injectable } from '@angular/core';
import {Todo} from "./todo";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  API_URL: string = environment.apiURL;

  constructor(private http: HttpClient) { }

  listAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.API_URL);
  }

  save(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.API_URL, todo);
  }

  delete(id: number): Observable<void> {
    const URL = `${this.API_URL}/${id}`;
    return this.http.delete<void>(URL);
  }

  markAsDone(id: number): Observable<Todo> {
    const URL = `${this.API_URL}/${id}/done`;
    return this.http.patch<Todo>(URL, {});
  }
}
