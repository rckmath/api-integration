import XMLBuilder from 'xmlbuilder';

import httpStatus from 'http-status';
import ExtendableError from '../../utilities/errors/extendable.js';
import { Errors } from '../../utilities/errors/business.js';
import Constants from '../../config/constants.js';

import { ClientType, ErrorCodesMap, ShippingType } from '../../enums/bling/index.js';
import BlingMechanism from '../../mechanisms/bling/index.js';
import BlingProductService from './product.js';

const { apiKey, defaultProductCode } = Constants.bling;

/**
 *
 * @param {Object} order Bling order orderData
 */
const OrderAdapter = (order) => ({
  blingNum: order.numero,
  totalValue: Number(order.totalvenda),
  createdDate: order.data,
});

export default class BlingOrderService {
  /**
   * @param {Object} deal Deal object containing the basic deal values
   * @returns {Promise<OrderAdapter>} Array of objects containing the basic properties of an order, according to OrderAdapter attributes
   */
  static async createOrder(deal) {
    const product = await BlingProductService.getProductById(defaultProductCode, apiKey);

    const encodedXML = this.getEncodedXML({
      deal,
      product,
    });

    const response = await BlingMechanism.createOrder(encodedXML, apiKey);

    if (!response || !response.retorno) {
      throw new ExtendableError('blingError', Errors.BLING_UNKNOWN_ERROR);
    }

    if (response.retorno.erros && response.retorno.erros.length) {
      const err = {};
      const errorBaseDescription = ErrorCodesMap.get(response.retorno.erros[0].erro.cod);

      err.status = httpStatus.BAD_REQUEST;
      err.description = `order_${errorBaseDescription}`;

      throw new ExtendableError('blingError', err);
    }

    return this.getOrderById(response.retorno?.pedidos[0]?.pedido?.numero);
  }

  /**
   *
   * @param {number} id Integer Bling order ID
   * @returns {Promise<OrderAdapter>} Object containing the basic properties of an order, according to OrderAdapter attributes
   */
  static async getOrderById(id) {
    const response = await BlingMechanism.getOrder(id, apiKey);

    if (!response || !response.retorno) {
      throw new ExtendableError('blingError', Errors.BLING_UNKNOWN_ERROR);
    }

    if (response.retorno.erros && response.retorno.erros.length) {
      const err = {};
      const errorBaseDescription = ErrorCodesMap.get(response.retorno.erros[0].erro.cod);

      err.status = httpStatus.BAD_REQUEST;
      err.description = `order_${errorBaseDescription}`;

      throw new ExtendableError('blingError', err);
    }

    if (!response.retorno.pedidos || response.retorno.pedidos.length === 0) {
      throw new ExtendableError('blingError', Errors.ORDER_NOT_FOUND);
    }

    return OrderAdapter(response.retorno.pedidos[0]?.pedido);
  }

  /**
   *
   * @param {object} orderData Object containing deal, contact and product data
   * @returns {string} Encoded URI XML string
   */
  static getEncodedXML(orderData) {
    const XMLObject = {
      pedido: {
        cliente: {
          id: { '#text': orderData.contact && orderData.contact.id },
          nome: { '#text': orderData.deal && orderData.deal.clientName },
          tipoPessoa: { '#text': ClientType.NATURAL },
        },
        transporte: {
          tipo_frete: { '#text': ShippingType.SENDER_SHIPPING_CONTRACTING },
        },
        itens: [{
          item: {
            codigo: { '#text': orderData.product && orderData.product.blingCode },
            descricao: { '#text': orderData.deal && `${orderData.deal.pipedriveId} - ${orderData.deal.title}` },
            un: { '#text': 'Pç' },
            qtde: { '#text': 1 },
            vlr_unit: { '#text': orderData.deal && orderData.deal.value },
          },
        }],
      },
    };

    const XML = XMLBuilder.create(XMLObject).end({ pretty: true });

    return encodeURI(XML);
  }
}
