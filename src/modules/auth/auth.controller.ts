import { Controller, Post, Query, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { ApiPublicEndpoint } from './decorators/api-public-endpoint.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @ApiPublicEndpoint()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req: any) {
        return await this.authService.login(req);
    }

    @Post('refresh-token')
    async refreshToken(@Query('token') token: string) {
        return this.authService.refreshToken(token);
    }
}
