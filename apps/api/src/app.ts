import express, { type Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { isTest } from './lib/env.js';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth.js';

import ContactRouter from './modules/contacts/contact.router.js';
import UserRouter from './modules/users/user.router.js';

const app: Express = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(helmet());
app.use(
  morgan('dev', {
    skip: () => isTest(),
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// health check
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'health check' });
});

// routes
app.use('/api/contacts', ContactRouter);
app.use('/api/users', UserRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'No Resources Found' });
});

export default app;
