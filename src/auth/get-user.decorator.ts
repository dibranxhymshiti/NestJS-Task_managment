import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Create a decorator @GetUser to retrieve the user data from request that we added in 'middleware' JwtStrategy
// from Validate() method. Usage: (@GetUser() user: User)
export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
