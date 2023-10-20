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

  taskObj : Task  = new Task()
  taskArr : Task[] = []
  addTaskValue : string = ''
  editTaskValue: string = ''

  constructor(private curdService: CrudService){ }

  ngOnInit(): void {
    this.addTaskValue = ''
    this.editTaskValue = ''
    this.taskObj = new Task()
    this.taskArr = []
    this.getAllTasks()
  }

  getAllTasks(){
    this.curdService.getAllTask().subscribe(res => {
      this.taskArr = res
    }, err =>{
      console.log("unable to get list of tasks")
    })
  }

  addTask() {
    const newTask = new Task();
    newTask.id = uuidv4();
    newTask.task_name = this.addTaskValue;
    newTask.is_completed = false;

    this.curdService.addTask(newTask).subscribe(
      (res) => {
        this.ngOnInit();
        this.addTaskValue = '';
      },
      (err) => {
        console.log("error", err);
      }
    );
  }


  editTask(){
    this.taskObj.task_name = this.editTaskValue
    this.curdService.editTask(this.taskObj).subscribe(res => {
      this.ngOnInit()
    }, err => {
      console.log("error: Failed to update the task")
    })
  }

  deleteTask(task: Task){
    this.curdService.deleteTask(task).subscribe(res => {
      this.ngOnInit()
    }, err =>{
      console.log("error: Failed to delete the task")
    })
  }

  call(oldTask: Task){
    this.taskObj = oldTask
    this.editTaskValue = oldTask.task_name
  }
  isCompleted(task: Task) {
    task = {
      ...task,
      is_completed: !task.is_completed
    };

    this.curdService.is_Completed(task).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        console.log("error: Failed to update the task");
      }
    );
}


}
