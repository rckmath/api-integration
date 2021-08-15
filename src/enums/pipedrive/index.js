/**
 * Deal status enumerator
 * From the Pipedrive deals/Search deals Postman API documentation (https://developers.pipedrive.com/docs/api/v1#/):
 */
const DealStatus = Object.freeze({
  OPEN: 'open',
  WON: 'won',
  LOST: 'lost',
});

// eslint-disable-next-line import/prefer-default-export
export { DealStatus };
