const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');
const iotsRoutes = require('./api/routes/iots');

mongoose.connect("mongodb://localhost:27017/tmpdb", { useNewUrlParser: true, useUnifiedTopology: true});

// it has to be here so we can modify and remove with mongoose
mongoose.set('useFindAndModify', false);

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// handling cors errors (CROSS-ORIGIN-RESOURCE-FRAMEWORK)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');

  if(req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
})

// routes which will handle requests
app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);
app.use('/iots', iotsRoutes);

app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404;
  next(error)
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
})


module.exports = app;
