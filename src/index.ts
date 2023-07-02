import express, { Application } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

import routes from './routes/index.js';

dotenv.config();

import sequelize from './config/sequelize.config.js';

sequelize.authenticate().then(() => console.log('DB connected'));

const app: Application = express();

// Development HTTP request logger middleware
if (process.env.NODE_ENV === 'DEVELOPMENT') {
    app.use(morgan('dev'));
}

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', routes);

const server = app.listen(process.env.PORT);

server.on('close', (error: Error | undefined) => {
    sequelize.close();
    process.exit(error ? 1 : 0);
});
