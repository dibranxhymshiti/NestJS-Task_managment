import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {

  constructor(private tasksService: TasksService) {
  }

  @Get()
  getTasks(): Promise<Task[]> {
    return this.tasksService.getAllTasks();
  }

  // @Get()
  // getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
  //
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getFilteredTasks(filterDto);
  //   } else {
  //     return this.tasksService.getAllTasks();
  //   }
  // }
  //
  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Task {
  //   return this.tasksService.getTaskById(id);
  // }
  //
  // @Post()
  // @UsePipes(ValidationPipe)
  // createTask(@Body() createTaskDto: CreateTaskDto): Task {
  //   return this.tasksService.createTask(createTaskDto);
  // }
  //
  // @Delete('/:id')
  // deleteTaskById(@Param('id') id: string): void {
  //   this.tasksService.deleteTaskById(id);
  // }
  //
  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body('status', TaskStatusValidationPipe) status: TaskStatus): Task {
  //   return this.tasksService.updateTaskStatus(id, status);
  // }
}
