import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private userService: UserService) { };

  @Get("/")
  async getAllUsers() {
    const users = await this.userService.findAll();
    return {
      success: true,
      messages: ["Users Fetched successfully"],
      data: users,
      status: 200,
    }
  }

  @Post("/create-many-users")
  async createManyUsers(@Body() createManyUsersDto: { name: string; email: string; phone: string; image: string }[]) {
    const newUsers = this.userService.createManyUsers(createManyUsersDto);
    return {
      success: true,
      messages: ["Users Created successfully"],
      data: newUsers,
      status: 201,
    }
  }
}