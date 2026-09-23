import http from 'node:http';
import app from './app.js';
import env from './lib/env.js';

export const server = http.createServer(app);

server.listen(env.PORT, () =>
  console.log(`Server is listening on Port: ${env.PORT}`),
);
