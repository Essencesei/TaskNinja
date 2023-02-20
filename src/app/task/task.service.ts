import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ITask } from './task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  taskData: ITask[] = [];
  task: ITask[] = [];

  getAllTasks(): ITask[] {
    return this.taskData;
  }

  addTask(task: ITask) {
    const id: number = this.taskData.length;
    task.taskID = id;
    this.taskData.push(task);
  }
  deleteTask(taskID: number) {
    this.taskData.splice(taskID, 1);
  }

  private _errorHandling(err: HttpErrorResponse) {
    return throwError(() => console.log(err));
  }
}
