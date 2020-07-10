import * as jwt from 'jsonwebtoken';
import { jwtConstants } from './jwt.constants';
import { UnauthorizedException } from '@nestjs/common';

// JUST FOR TESTING
// THIS MIDDLEWARE USES 'jsonwebtoken' WITHOUT PASSPORT OR NESTJS/JWT
export function CheckAuthMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, jwtConstants.secret);
    req.userData = { username: decodedToken['username'] };
    next();
  } catch {
    throw new UnauthorizedException();
  }

}

