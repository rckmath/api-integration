import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const dataSchema = new Schema({
  _id: Date,
  pipedriveDealsIds: [Number],
  blingOrdersNumbers: [String],
  totalSales: Number,
});

const DealOrder = model('deal-order', dataSchema);

export default DealOrder;
