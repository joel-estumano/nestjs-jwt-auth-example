import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TkInterface } from './entities/token.interface';
import { usersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: usersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = (await this.userService.findUserByEmail(email)) as any;
        if (user && (await bcrypt.compareSync(pass, user.password))) {
            return {
                _id: user._id,
                name: user.name,
                email: user.email,
            };
        }
        return null;
    }

    async login(req: any) {
        const payload: TkInterface = {
            sub: req.user._id,
            name: req.user.name,
            email: req.user.email,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async refreshToken(token: string) {
        try {
            const tokenDecode = (await this.jwtService.verifyAsync(
                token,
            )) as TkInterface;
            const payload = {
                sub: tokenDecode.sub,
                name: tokenDecode.name,
                email: tokenDecode.email,
            };
            return {
                access_token: this.jwtService.sign(payload),
            };
        } catch (error) {
            throw new UnauthorizedException('invalid token');
        }
    }
}
