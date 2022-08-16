require('dotenv').config();

const express = require('express');

const helmet = require('helmet');

const { errors } = require('celebrate');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const cors = require('cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const roterAutoriz = require('./routes/autorization');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', { useNewUrlParser: true, family: 4 });

const options = {
  origin: [
    'http://api.alexanderpar.students.nomoredomains.sbs',
    'https://api.alexanderpar.students.nomoredomains.sbs',
    'http://alexander.par.nomoredomains.sbs',
    'https://alexander.par.nomoredomains.sbs',
    'http://localhost:3000',
    'https://localhost:3000',
    'http://localhost:3001',
    'https://localhost:3001',
    'https://web.postman.co',
  ],
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  preflightContinue: false,
  credentials: false,

};

app.use(cors(options));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(helmet());

const { PORT = 3000 } = process.env;
const NotFoundError = require('./errors/NotFoundError');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', roterAutoriz);
app.use('/', routerUsers);
app.use('/', routerCards);
app.use(errors());
app.use(errorLogger);
app.use((req, res, next) => next(new NotFoundError('Страница не найдена')));

app.use((err, req, res, next) => {
  if (err.statusCode && err.statusCode !== 500) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(500).send({ message: 'Что-то пошло не так' });
  }
  next(err);
});

app.listen(PORT, () => {
  console.log('Сервер запущен');
  console.log(process.env.NODE_ENV);
});
