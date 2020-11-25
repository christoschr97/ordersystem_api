const mongoose = require('mongoose');


const iotSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  date: { type: Date, default: Date.now },
  light: mongoose.Schema.Types.Number,
  battery: mongoose.Schema.Types.Number,
  event: String,
  temperature: mongoose.Schema.Types.Number
})

module.exports = mongoose.model('Iot', iotSchema);
