const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const roterAutoriz = require('./routes/autorization');

const { PORT = 3000 } = process.env;
const NotFoundError = require('./errors/NotFoundError');

const app = express();

const { requestLogger, errorLogger } = require('./middlewares/logger');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(helmet());
app.use(requestLogger);
app.use(cors({
  origin: [
    'http://alexander.par.nomoredomains.sbs',
    'https://alexander.par.nomoredomains.sbs',
    'http://localhost:3000',
    'https://localhost:3000',
  ],
  credentials: true,
}));
app.use('/', roterAutoriz);
app.use('/', routerUsers);
app.use('/', routerCards);
app.use(errorLogger);
app.use(errors());

app.use((req, res, next) => next(new NotFoundError('Страница не найдена')));
app.use((err, req, res, next) => {
  if (err.statusCode && err.statusCode !== 500) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(500).send({ message: 'Что-то пошло не так' });
  }
  next(err);
});

app.listen(PORT, '127.0.0.1', () => {
  console.log('Сервер запущен');
});
