import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Todo } from "./interfaces/todo.interface";
import { TodosService } from "./todos.service";

@UseGuards (JwtAuthGuard)
@Controller('todos')
export class TodosController{
    constructor(private readonly todoService: TodosService){}
    @Post()
    async addTodo(
        @Body() todo: Todo
    ): Promise<any>{
        return await this.todoService.insertTodo(todo);
        
    }
    
    @Get()
    async getAllTodos(){
        return await this.todoService.getTodos();
    }

    @Get(':id')
    async getTodoById(
        @Param('id') todoId: string
    ): Promise<Todo>{
        return await this.todoService.getSingleTodo(todoId);
    }

    @Put(':id')
    async editTodo(
        @Param('id') todoId:string,
        @Body() todo: Todo
    ){
        return await this.todoService.updateTodos(todoId, todo)
    }

    @Delete(':id')
    async deleteTodo(
        @Param('id') todoId:string
    ){
        await this.todoService.deleteTodos(todoId);
        return null;
    }
}