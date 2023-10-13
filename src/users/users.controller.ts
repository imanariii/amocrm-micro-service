
import { Body, Controller, Get } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get('create')
  findOrCreate(@Body() createUserDto: CreateUserDto) {
    return this.usersService.findOrCreate(createUserDto)
  }
}