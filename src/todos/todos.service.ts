import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';

import { Todo } from './interfaces/todo.interface';

@Injectable()
export class TodosService {

  constructor(
    @InjectModel('Todo') private readonly todoModel: Model<Todo>
    ){}

  //Create new Todo
  async insertTodo( todo: Todo ): Promise<Todo>{
    const newTodo = new this.todoModel(todo);
    return newTodo.save();
  }
  
  //Get All Todos
  async getTodos(): Promise<Todo[]>{
    return this.todoModel.find().exec();
  }

  //Get Single Todo
  async getSingleTodo(id: string):Promise<Todo>{
    return await this.findTodo(id);
  }

  //Update Todo
  async updateTodos(id: string, todo: Todo):Promise<Todo>{
    let updatedTodo = await this.findTodo(id);
    if(todo.title){
      updatedTodo.title = todo.title;
    }
    return updatedTodo.save()
  }

  //Remove Todo
  async deleteTodos(todoId: string){
    const result = await this.todoModel.deleteOne({_id:todoId}).exec();
    if(result.n === 0){
      throw new NotFoundException('Could not found Todo')
    }
  }

  //Get Specific Todo by its id 
  private async findTodo( id: string ):Promise<any>{
    let todo;
    try {
      todo = await this.todoModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could Not Found Todo');
    }
    if(! todo){
      throw new NotFoundException('Could Not Found Todo');
    }
    return todo;
  }
}
