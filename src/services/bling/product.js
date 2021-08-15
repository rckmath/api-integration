import httpStatus from 'http-status';
import { Errors } from '../../utilities/errors/business.js';
import ExtendableError from '../../utilities/errors/extendable.js';
import BlingMechanism from '../../mechanisms/bling/index.js';
import { ErrorCodesMap } from '../../enums/bling/index.js';

/**
 *
 * @param {Object} product Bling product data
 */
const ProductAdapter = (product) => ({
  blingId: product.id,
  blingCode: product.codigo,
  description: product.descricao,
  price: product.preco,
});

export default class BlingProductService {
  static async getProductById(id, apiKey) {
    const response = await BlingMechanism.getProduct(id, apiKey);

    if (!response || !response.retorno) {
      throw new ExtendableError('blingError', Errors.BLING_UNKNOWN_ERROR);
    }

    if (response.retorno.erros && response.retorno.erros.length) {
      const err = {};
      const errorBaseDescription = ErrorCodesMap.get(response.retorno.erros[0].erro.cod);

      err.status = httpStatus.BAD_REQUEST;
      err.message = `product_${errorBaseDescription}`;

      throw new ExtendableError('blingError', err);
    }

    if (!response.retorno.produtos || response.retorno.produtos.length === 0) {
      throw new ExtendableError('blingError', Errors.PRODUCT_NOT_FOUND);
    }

    return ProductAdapter(response.retorno.produtos[0].produto);
  }
}
