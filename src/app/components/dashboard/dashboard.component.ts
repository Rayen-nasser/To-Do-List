import { OnInit ,Component } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';
import { v4 as uuidv4 } from 'uuid'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  addTaskValue: string = '';
  editTaskValue: string = '';
  completedTask: boolean = false;
  taskObj: Task = new Task();
  taskArr: Task[] = [];

  ngOnInit(): void {
    this.loadTasksFromLocalStorage();
  }

  loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.taskArr = JSON.parse(storedTasks);
    }
  }

  saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.taskArr));
  }

  addTask() {
    const newTask = new Task();
    newTask.id = uuidv4();
    newTask.task_name = this.addTaskValue;
    newTask.is_completed = false;

    this.taskArr.push(newTask);
    this.saveTasksToLocalStorage();

    this.addTaskValue = '';
  }

  editTask() {
    const taskIndex = this.taskArr.findIndex(item => item.id === this.taskObj.id);
    if (taskIndex !== -1) {
      this.taskArr[taskIndex].task_name = this.editTaskValue;
      this.saveTasksToLocalStorage();
    }

    this.editTaskValue = '';
  }

  deleteTask(task: Task) {
    this.taskArr = this.taskArr.filter(item => item.id !== task.id);
    this.saveTasksToLocalStorage();
  }

  call(oldTask: Task) {
    this.taskObj = oldTask;
    this.editTaskValue = oldTask.task_name;
  }


  call2(oldTask: Task) {
    this.taskObj = oldTask;
    this.completedTask = oldTask.is_completed;
    this.isCompleted(oldTask)
  }

  isCompleted(task: Task) {
    const taskIndex = this.taskArr.findIndex(item => item.id === task.id);
    if (taskIndex !== -1) {
      this.taskArr[taskIndex].is_completed = !task.is_completed;
      localStorage.setItem('tasks', JSON.stringify(this.taskArr)); // Serialize and save to localStorage
    }
  }




}
