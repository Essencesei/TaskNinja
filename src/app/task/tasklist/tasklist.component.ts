import { DatePipe } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ITask } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css'],
})
export class TasklistComponent implements OnInit, OnChanges {
  constructor(private task: TaskService) {}

  taskData: ITask[] = [];
  completedTask: ITask[] = [];
  private _taskTextArea: string = '';
  addtaskToggle: boolean = false;

  get taskTextArea(): string {
    return this._taskTextArea;
  }
  set taskTextArea(text: string) {
    this._taskTextArea = text;
  }

  addTask(): void {
    const dataTemp: ITask = {
      date: Date.now(),
      time: new Date().toLocaleTimeString(),
      taskID: 0,
      taskDescription: this._taskTextArea,
      isDone: false,
    };
    this.task.addTask(dataTemp);
    this.taskTextArea = '';
  }
  check(event: any, index: number) {
    console.log(this.taskData[index]);
    this.taskData[index].isDone = true;
    this.completedTask.push(this.taskData[index]);
    this.taskData.splice(index, 1);
  }
  toggleAddTask(event: any): void {
    this.addtaskToggle = !this.addtaskToggle;

    if (this.addtaskToggle) {
      event.target.textContent = 'Close';
    } else {
      event.target.textContent = 'Create Task';
    }
  }
  onDeleteTask(id: number): void {
    this.task.deleteTask(id);
    console.log(this.taskData);
  }

  ngOnInit(): void {
    this.taskData = this.task.getAllTasks();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.taskData = this.task.getAllTasks();
  }
}
