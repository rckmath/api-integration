import httpStatus from 'http-status';
import express from 'express';
import DealService from '../services/deal.js';

const routes = express.Router();

routes.post('/sync',
  async (req, res, next) => {
    let response;

    try {
      response = await DealService.sync();
    } catch (err) {
      return next(err, req, res);
    }

    return res.status(httpStatus.OK).json(response);
  });

export default routes;
