import httpStatus from 'http-status';
import express from 'express';
import DealOrderService from '../services/deal-order.js';
import DealOrderDto from '../models/deal-order.dto.js';

const routes = express.Router();

routes.post('/sync',
  async (req, res, next) => {
    let response;

    try {
      response = await DealOrderService.syncNow();
    } catch (err) {
      return next(err, req, res);
    }

    return res.status(httpStatus.OK).json(DealOrderDto(response));
  });

routes.get('/',
  async (req, res, next) => {
    let response;

    try {
      response = await DealOrderService.getDealOrders();
    } catch (err) {
      return next(err, req, res);
    }

    const dealOrderDto = response?.map((r) => DealOrderDto(r));

    return res.status(httpStatus.OK).json(dealOrderDto);
  });

export default routes;
