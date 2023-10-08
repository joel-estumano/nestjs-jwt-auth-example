import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserCreateDto } from './dtos/user-create.dto';
import { usersService } from './users.service';
import { ApiPublicEndpoint } from '../auth/decorators/api-public-endpoint.decorator';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: usersService) { }

    @ApiPublicEndpoint()
    @Post('create')
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() dto: UserCreateDto) {
        return await this.userService.create(dto);
    }
}
