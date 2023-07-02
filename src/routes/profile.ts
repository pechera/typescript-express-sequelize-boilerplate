import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import logger from '../config/logger.config.js';

const router: Router = Router();

// @route   GET /profile
// @desc    Profile data route
// @access  Private
router.get('/profile', async (req: Request, res: Response) => {
    try {
        res.end();
    } catch (e) {
        logger.error(`Profile Route: ${e}`);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
});

export default router;
