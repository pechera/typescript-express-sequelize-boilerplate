import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';

import logger from '../config/logger.config.js';

async function auth(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers.authorization;

    if (!accessToken) return res.sendStatus(StatusCodes.UNAUTHORIZED);

    try {
        jwt.verify(accessToken.split(' ')[1], process.env.JWT_SECRET as string) as JwtPayload;

        return next();
    } catch (e: any) {
        logger.error('Auth', e);
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: e.message });
    }
}

export default auth;
