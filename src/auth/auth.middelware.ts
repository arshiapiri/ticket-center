import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { sessionEntity } from './auth.entity';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
    constructor(private readonly sessionService: AuthService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        console.log(req.headers.authorization);
        const token: string | undefined = req.headers?.authorization?.replace("Bearer", "");
        console.log(token);
        if (!token) throw new UnauthorizedException();
        const session: sessionEntity = await this.sessionService.findSessionByToken(token)
        if (!session) throw new UnauthorizedException();

        if(Number(session.expireTime) < this.sessionService.formatExpireTime()) {
            await this.sessionService.removeSession(session)
            throw new UnauthorizedException()
        }
        req.res.locals.user = session.user
        
        console.log( req.res.locals.user);
        
        next();
    }
}
