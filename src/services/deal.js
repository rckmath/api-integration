import BlingOrderService from './bling/order.js';
import PipedriveDealService from './pipedrive/deal.js';

export default class DealService {
  static async sync() {
    const wonDeals = await PipedriveDealService.getWonDeals();

    const ordersPromises = wonDeals.map(async (deal) => {
      const order = await BlingOrderService.createOrder(deal);

      return { order, deal };
    });

    const createdOrders = await Promise.allSettled(ordersPromises);

    const response = createdOrders.map((co) => {
      if (co.status === 'fulfilled') {
        return co?.value;
      }

      return console.error(co.reason.message);
    }).filter((o) => o);

    return response;
  }
}
