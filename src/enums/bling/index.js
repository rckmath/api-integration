/**
 * Client typing enumerator
 * From the Bling docs (https://ajuda.bling.com.br/hc/pt-br/articles/360046378614-POST-contato):
 *
 * "F" caracteriza pessoa física
 * "J" caracteriza pessoa jurídica
 * "E" caracteriza pessoa estrangeira
 */
const ClientType = Object.freeze({
  LEGAL: 'J',
  NATURAL: 'F',
  FOREIGNER: 'E',
});

/**
 * Shipping typing enumerator
 * From the Bling docs (https://ajuda.bling.com.br/hc/pt-br/articles/360047064693-POST-pedido):
 *
 * R 0 - Contratação do Frete por conta do Remetente (CIF)
 * D 1 - Contratação do Frete por conta do Destinatário (FOB)
 * T 2 - Contratação do Frete por conta de Terceiros
 * 3 3 - Transporte Próprio por conta do Remetente
 * 4 4 - Transporte Próprio por conta do Destinatário
 * S 9 - Sem Ocorrência de Transporte
 */
const ShippingType = Object.freeze({
  SENDER_SHIPPING_CONTRACTING: 'R',
  RECIPIENT_SHIPPING_CONTRACTING: 'D',
  THIRD_PARTY_SHIPPING_CONTRACTING: 'T',
  SENDER_RESPONSIBILITY: '3',
  RECIPIENT_RESPONSIBILITY: '4',
  NO_TRANSPORT: 'S',
});

/**
 * Error codes enumerator
 * From the Bling docs
 *  (https://ajuda.bling.com.br/hc/pt-br/articles/360046940653-Respostas-de-erros-para-Desenvolvedores-API)
 *  (https://ajuda.bling.com.br/hc/pt-br/articles/360047064693-POST-pedido):
 *
 * 2 API Key nao informada - Parâmetro api key não foi encontrado
 * 3 API Key invalida
 * 14 A informação desejada não foi encontrada
 * 30 Pedido ja cadastrado no sistema - Um pedido com o mesmo hash ja encontra-se cadastrado (3)
 */
const ErrorCodesMap = new Map([
  [2, 'missing_bling_api_key'],
  [3, 'invalid_bling_api_key'],
  [14, 'not_found'],
  [30, 'already_registered'],
  [31, 'missing_items'],
]);

export {
  ClientType,
  ShippingType,
  ErrorCodesMap,
};
