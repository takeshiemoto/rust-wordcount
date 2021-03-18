/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as cors from 'cors';
import * as express from 'express';
import * as jwt from 'express-jwt';
import { sign } from 'jsonwebtoken';

const app = express();

app.use(cors());

const jwtSecret = 'secret123';

app.get('/jwt', (req, res) => {
  res.json({
    token: sign({ user: 'Hello' }, jwtSecret),
  });
});

app.use(jwt({ secret: jwtSecret, algorithms: ['SH256'] }));

const foods = [
  { id: 1, description: 'burritos' },
  { id: 2, description: 'quesadillas' },
  { id: 3, description: 'churos' },
];

app.get('/foods', (req, res) => {
  res.json(foods);
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
