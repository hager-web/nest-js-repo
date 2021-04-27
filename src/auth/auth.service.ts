import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'; 
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/interfaces/user.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor ( 
    private userService: UserService, 
    private jwtService: JwtService 
  ) {}

  async login (createUserDto: CreateUserDto) {
    let data = await this.userService.findOneByEmail (createUserDto.email);
    if (! data ||! await bcrypt.compare (createUserDto.password, data.password)) { 
      throw new Error ('Invalid username or password') 
    }
    
    return {
      access_token: this.jwtService.sign ({
        "id": data.id},
        {secret: process.env.JWT_SECRET}
      )
    }
  }

  async validateUserByJwt(payload: any) { 
    // This will be used when the user has already logged in and has a JWT
    let user = await this.userService.findOneById(payload.id);
    if(!user){
      throw new UnauthorizedException();
    } else {
      return user;
    }
  }

}