import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from "@nestjs/common";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService, 
    private readonly userService: UserService 

  ) {}
  @Post("login")
  async login(@Body() createUserDto: CreateUserDto) {
    try {
      let data = await this.authService.login(createUserDto);
      return data;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  @Post("register")
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      let findUser = await this.userService.findOneByEmail(createUserDto.email);
      if (findUser) {
        return "This email already registered! You can Login";
      }

      let data = await this.userService.create(createUserDto);
      return "Successfully register, now you could login!";
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
