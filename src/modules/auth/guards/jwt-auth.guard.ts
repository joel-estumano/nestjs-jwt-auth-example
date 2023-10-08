import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private readonly reflector: Reflector) {
        super();
    }

    handleRequest(err: any, user: any, info: Error, context: any) {
        if (user) {
            return user;
        }
        const isApiPublicEndpoint = this.reflector.get<boolean>(
            'api-public-endpoint',
            context.getHandler(),
        );
        if (isApiPublicEndpoint) {
            return true;
        }
        throw new UnauthorizedException();
    }
}
