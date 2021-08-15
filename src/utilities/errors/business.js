import httpStatus from 'http-status';

const Errors = {
  DEAL_NOT_FOUND: {
    description: 'deal_not_found',
    status: httpStatus.BAD_REQUEST,
  },
  PRODUCT_NOT_FOUND: {
    description: 'product_not_found',
    status: httpStatus.BAD_REQUEST,
  },
  ORDER_NOT_FOUND: {
    description: 'order_not_found',
    status: httpStatus.BAD_REQUEST,
  },
  PIPEDRIVE_UNKNOWN_ERROR: {
    description: 'pipedrive_unknown_error',
    status: httpStatus.INTERNAL_SERVER_ERROR,
  },
  BLING_UNKNOWN_ERROR: {
    description: 'bling_unknown_error',
    status: httpStatus.INTERNAL_SERVER_ERROR,
  },
};

// eslint-disable-next-line import/prefer-default-export
export { Errors };
