import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsObjectIdPipe } from 'src/common/pipe/is-object-id.pipe';

@ApiBearerAuth()
@ApiTags('user-v1')
@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', IsObjectIdPipe) id: string): Promise<User> {
    return this.usersService.findOne(id);
  }
}
