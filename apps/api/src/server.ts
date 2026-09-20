import http from 'node:http';
import app from './app.js';

export const server = http.createServer(app);

server.listen(3000, () => console.log(`Server is listening on port: 3000`));
