
import { Body, Controller, Get, Query, Req } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get('')
  findOrCreate(@Body() createUserDto: CreateUserDto) {
    return this.usersService.findPatchOrCreate(createUserDto)
  }
  @Get('')
  getToken(@Req() req) {
    return req
  }
}