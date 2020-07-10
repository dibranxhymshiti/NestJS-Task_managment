import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {

  constructor(private tasksService: TasksService) {
  }

  @Get()
  getTasks(
    @Query(ValidationPipe) tasksFilterDto: GetTasksFilterDto,
    @GetUser() user: User): Promise<Task[]> {
    console.log(user);
    return this.tasksService.getTasks(tasksFilterDto, user);
  }


  @Get('/:id')
  getTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTask(id, user);
  }


  @Post()
  createTask(
    @Body(ValidationPipe) createTaskDto: CreateTaskDto,
    @GetUser() user: User): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User) {
    return this.tasksService.deleteTask(id, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status, user);
  }

}
