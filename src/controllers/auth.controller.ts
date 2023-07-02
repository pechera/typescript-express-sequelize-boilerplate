import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import logger from '../config/logger.config.js';

import User from '../models/user.js';

import { loginSchema, registerSchema } from '../validation/Joi.validation.js';

type Tokens = {
    accessToken: string;
    refreshToken: string;
};

class AuthController {
    constructor() {
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.token = this.token.bind(this);
    }

    public async login(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            await loginSchema.validateAsync({ email, password });

            const user = await User.findOne({
                where: {
                    email,
                },
            });

            if (!user) throw new Error('User not found');

            const compare = await bcrypt.compare(password, user.dataValues.password);

            if (!compare) throw new Error('Incorrect password');

            const { accessToken, refreshToken } = this.renewTokens(user.dataValues.uuid);

            res.status(StatusCodes.OK).json({
                accessToken,
                refreshToken,
            });
        } catch (e: any) {
            logger.error('Login Route:', e);
            res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message });
        }
    }

    public async register(req: Request, res: Response) {
        const { name, email, password } = req.body;

        try {
            await registerSchema.validateAsync({
                name,
                email,
                password,
            });

            // Check that the user with the same email does not exist
            const user = await User.findOne({
                where: {
                    email,
                },
            });

            if (user) throw new Error('User already exists');

            // Hashing the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const { dataValues } = await User.create({
                name: name.trim(),
                email: email.toLowerCase().trim(),
                password: hashedPassword,
            });

            return res.status(StatusCodes.OK).json({
                email: dataValues.email,
            });
        } catch (e: any) {
            logger.error('Registration Route', e);
            res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message });
        }
    }

    public async token(req: Request, res: Response) {
        const { token } = req.body;

        if (!token) {
            return res.status(StatusCodes.UNAUTHORIZED);
        }

        try {
            const { uuid } = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

            const { accessToken, refreshToken } = this.renewTokens(uuid);

            return res.json({
                accessToken,
                refreshToken,
            });
        } catch (e: any) {
            logger.error('Token route', e);
            return res.status(StatusCodes.UNAUTHORIZED);
        }
    }

    private renewTokens(uuid: string): Tokens {
        // Create Access token
        const accessToken = jwt.sign({ uuid }, process.env.JWT_SECRET as string, {
            expiresIn: process.env.JWT_ACCESS_EXP,
        });

        // Create Refresh token
        const refreshToken = jwt.sign({ uuid }, process.env.JWT_SECRET as string, {
            expiresIn: process.env.JWT_REFRESH_EXP,
        });

        return { accessToken, refreshToken };
    }
}

export default AuthController;
