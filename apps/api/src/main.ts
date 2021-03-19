import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as csurf from 'csurf';
import * as express from 'express';
import * as jwt from 'express-jwt';
import { sign } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const app = express();

const JWT_TOKEN_EXPIRES = 1; // min

app.use(cors());
app.use(cookieParser());
app.use(
  csurf({
    cookie: true,
  })
);

app.get('/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

const jwtSecret = 'secret123';

// リフレッシュトークンを管理するデータベース
const refreshTokenDatabase: Map<string, string> = new Map();

// サインイン
app.get('/signin', (req, res) => {
  // ユーザー情報の認証が成功したと仮定する

  // リフレッシュトークンを生成
  const refreshToken = uuidv4();
  // リフレッシュトークンをDBに保存
  refreshTokenDatabase.set(refreshToken, refreshToken);
  // リフレッシュトークンをClientのCookieに書き込み
  res.cookie('refresh_token', refreshToken, { httpOnly: true });

  // JWTトークンを生成
  const token = sign({ user: 'Hello' }, jwtSecret, {
    expiresIn: JWT_TOKEN_EXPIRES * 60,
  });
  const expiry = new Date(new Date().getTime() + JWT_TOKEN_EXPIRES * 60 * 1000);

  res.json({ token, expiry });
});

app.get('/refresh_token', (req, res) => {
  // Cookieからrefresh_tokenを読み取る
  const refreshToken = req.cookies['refresh_token'];
  console.log(refreshTokenDatabase);

  // リフレッシュトークンの存在を問い合わせる
  if (!refreshTokenDatabase.has(refreshToken)) {
    res.status(401).json({
      error: {
        message: 'Invalid refresh token request',
      },
    });
    return;
  }

  // 新しいリフレッシュトークンを生成
  const newRefreshToken = uuidv4();
  // トークンを更新
  refreshTokenDatabase.delete(refreshToken);
  refreshTokenDatabase.set(newRefreshToken, newRefreshToken);
  // 新しいリフレッシュトークンCookieに保存
  res.cookie('refresh_token', newRefreshToken, { httpOnly: true });

  // 新しいJWTを生成
  const newToken = sign({ user: 'Hello' }, jwtSecret, {
    expiresIn: JWT_TOKEN_EXPIRES * 60,
  });

  const expiry = new Date(new Date().getTime() + JWT_TOKEN_EXPIRES * 60 * 1000);
  res.json({ token: newToken, expiry });
});

app.use(
  jwt({
    secret: jwtSecret,
    algorithms: ['HS256'],
    // getToken: (req) => req.cookies.token,
  })
);

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
