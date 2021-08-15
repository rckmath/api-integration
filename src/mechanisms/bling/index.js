import Constants from '../../config/constants.js';
import { initInstance } from '../axios-instance.js';

export default class Bling {
  static bling = Constants.bling;

  static async createOrder(data) {
    const instance = initInstance(this.bling.baseUrl, 'bling');

    const response = await instance.post(`/pedido/json?apikey=${this.bling.apiKey}`, data);

    return response;
  }

  static async getOrder(id) {
    const instance = initInstance(this.bling.baseUrl, 'bling');

    const response = await instance.get(`/pedido/${id}/json?apikey=${this.bling.apiKey}`);

    return response;
  }

  static async listOrders() {
    const instance = initInstance(this.bling.baseUrl, 'bling');

    const response = await instance.get(`/pedidos/json?apikey=${this.bling.apiKey}`);

    console.log(response);

    return response;
  }

}
