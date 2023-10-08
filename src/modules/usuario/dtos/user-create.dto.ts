
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { MatchPassword } from '../decorators/match-password.decorator';

export class UserCreateDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;

    @IsNotEmpty()
    @IsString()
    @MatchPassword(UserCreateDto, (u) => u.password, { message: 'password and confirm your mismatched password' })
    confirmPassword: string;
}