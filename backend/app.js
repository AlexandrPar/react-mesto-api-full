require('dotenv').config();

console.log(process.env.NODE_ENV);

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const roterAutoriz = require('./routes/autorization');
const cors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;
const NotFoundError = require('./errors/NotFoundError');

const app = express();

const { requestLogger, errorLogger } = require('./middlewares/logger');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(helmet());
app.use(requestLogger);
app.use(cors);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
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
  console.log(process.env.NODE_ENV);
});
