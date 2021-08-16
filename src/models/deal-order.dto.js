/**
 *
 * @param {object} dealOrder Deal order model object
 */
const DealOrderDto = (dealOrder) => ({
  id: dealOrder._id,
  pipedriveDealsIds: dealOrder.pipedriveDealsIds,
  blingOrdersNumbers: dealOrder.blingOrdersNumbers,
  totalSales: dealOrder.totalSales,
});

export default DealOrderDto;
