import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import compress from 'compression';
import httpStatus from 'http-status';

import routes from './routes/index.js';
import Constants from './config/constants.js';

const app = express();

if (Constants.env === 'development') { app.use(morgan('dev')); }

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compress());
app.use(cors());

app.use('/api', routes);

app.use((_req, _res, next) => {
  const err = new Error('not_found');

  err.status = httpStatus.NOT_FOUND;

  next(err);
});

app.use((err, _req, res, _next) => {
  res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR);

  res.send({
    error: {
      status: err.status || httpStatus.INTERNAL_SERVER_ERROR,
      message: err.message,
    },
  });
});

export default app;
