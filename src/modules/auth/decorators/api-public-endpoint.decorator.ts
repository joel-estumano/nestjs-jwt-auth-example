import { SetMetadata } from '@nestjs/common';

export const ApiPublicEndpoint = () => SetMetadata('api-public-endpoint', true);
