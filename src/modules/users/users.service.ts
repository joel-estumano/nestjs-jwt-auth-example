import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserCreateDto } from './dtos/user-create.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) { }

    async create(dto: UserCreateDto): Promise<User> {
        const dto_: UserCreateDto = {
            ...dto,
            password: await bcrypt.hashSync(dto.password, 10),
        };
        const create: User = await new this.userModel(dto_).save();
        return Object.assign(create, { password: undefined });
    }

    async findUserByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({ email: email }).exec();
    }
}
