const mongoose = require('mongoose');


const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  orderName: String,
  products: []
})

module.exports = mongoose.model('Order', orderSchema);
