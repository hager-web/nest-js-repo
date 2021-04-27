import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    if(!createUserDto.name || !createUserDto.email || !createUserDto.password){
      throw new BadRequestException("Invalid entered Data");
    }
    let createdUser = new this.userModel(createUserDto);
    // The determinant of hashing, the higher the better, but it takes time, 10 is sufficient 
    const saltOrRounds = 10; 
    // We hash the password which is used as the object of dto 
    const hash = await bcrypt.hash (createdUser.password, saltOrRounds); 
    // The password in the object is overwritten with the password that has been hashed
    createdUser.password = hash;
    return await createdUser.save();
  }

  //Get All Users
  async getUsers(): Promise<User[]>{
    return this.userModel.find().exec();
  }

  async findOneByEmail(email): Promise<User> {
    return await this.userModel.findOne({email: email});
  }

  async findOneById(id): Promise<User> {
    return await this.userModel.findOne({_id: id});
  }
}
