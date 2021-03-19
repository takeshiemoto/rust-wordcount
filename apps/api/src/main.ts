import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as csurf from 'csurf';
import * as express from 'express';
import * as jwt from 'express-jwt';
import { sign } from 'jsonwebtoken';

const app = express();

app.use(cors());

const jwtSecret = 'secret123';

app.get('/', (req, res) => {
  res.json({ message: 'Hello API' });
});

app.get('/jwt', (req, res) => {
  const token = sign({ user: 'Hello' }, jwtSecret);
  res.cookie('token', token, { httpOnly: true });
  res.json({ token });
});

app.use(cookieParser());
app.use(
  jwt({
    secret: jwtSecret,
    algorithms: ['HS256'],
    getToken: (req) => req.cookies.token,
  })
);

app.use(
  csurf({
    cookie: true,
  })
);

app.get('/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

const foods = [
  { id: 1, description: 'burritos' },
  { id: 2, description: 'quesadillas' },
  { id: 3, description: 'churos' },
];

app.post('/foods', (req, res) => {
  foods.push({
    id: foods.length + 1,
    description: 'new food',
  });
  res.json({
    message: 'Food created',
  });
});

app.get('/foods', (req, res) => {
  res.json(foods);
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
