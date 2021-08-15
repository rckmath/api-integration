import Constants from '../../config/constants.js';
import { initInstance } from '../axios-instance.js';

const { baseUrl } = Constants.bling;

export default class Bling {
  /**
   *
   * @param {string} id Bling product code
   * @param {string} apiKey Bling API Key/Token
   * @returns {object} Request response containing provider data
   */
  static async getProduct(id, apiKey) {
    const instance = initInstance(baseUrl, 'bling');

    const response = await instance.get(`/produto/${id}/json?apikey=${apiKey}`);

    return response;
  }

  /**
   *
   * @param {string} data Encoded XML containing the order data
   * @param {string} apiKey Bling API Key/Token
   * @returns {object} Request response containing provider data
   */
  static async createOrder(data, apiKey) {
    const instance = initInstance(baseUrl, 'bling');

    const response = await instance.post(`/pedido/json?apikey=${apiKey}&xml=${data}`);

    return response;
  }

  /**
   *
   * @param {string} id Bling order number
   * @param {string} apiKey Bling API Key/Token
   * @returns {object} Request response containing provider data
   */
  static async getOrder(id, apiKey) {
    const instance = initInstance(baseUrl, 'bling');

    const response = await instance.get(`/pedido/${id}/json?apikey=${apiKey}`);

    return response;
  }

  /**
   *
   * @param {string} apiKey Bling API Key/Token
   * @returns {object} Request response containing provider data
   */
  static async listOrders(apiKey) {
    const instance = initInstance(baseUrl, 'bling');

    const response = await instance.get(`/pedidos/json?apikey=${apiKey}`);

    return response;
  }

  /**
   *
   * @param {string} id Bling contact ID, CPF or CNPJ
   * @param {string} apiKey Bling API Key/Token
   * @returns {object} Request response containing provider data
   */
  static async getContact(id, apiKey) {
    const instance = initInstance(baseUrl, 'bling');

    const response = await instance.get(`/contato/${id}/json?apikey=${apiKey}`);

    return response;
  }
}
