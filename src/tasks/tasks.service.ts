import { Injectable, NotFoundException } from '@nestjs/common';

import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {

  constructor(private taskRepository: TaskRepository) {
  }

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async getTask(id: number, user: User): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id, userId: user.id } });

    if (!task) {
      throw new NotFoundException(`Task with id: ${id} does not exist`);
    }

    return task;
  }


  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.user = user;

    await this.taskRepository.save(task);
    delete task.user;

    return task;
  }

  async deleteTask(id: number, user: User) {
    const deleteResult = await this.taskRepository.delete({ id, userId: user.id });

    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Task with id: ${id} does not exist`);
    }
  }

  async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTask(id, user);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }
}
