import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {

  constructor(private taskRepository: TaskRepository) {
  }


  async getAllTasks(): Promise<Task[]> {

    return this.taskRepository.find();

  }

  //
  // getFilteredTasks(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //
  //   let tasks = this.getAllTasks();
  //
  //   if (status) {
  //     tasks = tasks.filter(task => task.status === status);
  //   }
  //
  //   if (search) {
  //
  //     tasks = tasks.filter(task =>
  //       task.title.toLowerCase().includes(search) || task.description.toLowerCase().includes(search),
  //     );
  //   }
  //
  //   return tasks;
  // }
  //
  // getTaskById(id: string): Task {
  //   const task = this.tasks.find(task => task.id === id);
  //
  //   if (!task) {
  //     throw new NotFoundException(`Task with id: ${id} does not exist`);
  //   }
  //
  //   return task;
  // }
  //
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const task: Task = {
  //     id: uuid(),
  //     ...createTaskDto,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //
  //   return task;
  // }
  //
  // deleteTaskById(id: string): void {
  //   const task = this.getTaskById(id);
  //   this.tasks = this.tasks.filter(ts => ts.id != task.id);
  // }
  //
  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }

}
