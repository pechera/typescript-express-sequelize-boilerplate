import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';

import logger from '../config/logger.config.js';

import auth from '../middlewares/auth.middleware.js';

import User from '../models/user.js';

const router: Router = Router();

// @route   GET /profile
// @desc    Profile data route
// @access  Private
router.get('/profile', auth, async (req: Request, res: Response) => {
    const accessToken = req.headers.authorization as string;

    try {
        const { uuid } = jwt.decode(accessToken.split(' ')[1]) as JwtPayload;

        const user = await User.findOne({
            where: {
                uuid,
            },
        });

        if (!user) throw new Error('User not found');

        const { name, email } = user.dataValues;

        res.status(StatusCodes.OK).json({ name, email });
    } catch (e) {
        logger.error(`Profile Route: ${e}`);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
});

export default router;
