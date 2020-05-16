const express = require('express')
const router = express.Router();
const Order = require('../models/order')

router.get('/', (req, res, next) => {
  Order.find().then(result => {
    console.log(result);
    res.status(200).json({
      orders: result
    })
  }).catch(err => {
    res.status(400).json({
      error: err
    })
  })
});

router.post('/', (req, res, next) => {
  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    orderName: req.body.orderName,
    products: req.body.products
  })
  order.save().then(result => {
    console.log(result);
    res.status(200).json({
      result: result
    })
  }).catch(err => {
    res.status(400).json({
      error: err
    })
  })
})

router.get('/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId).then(result => {
    console.log(result);
    res.status(200).json({
      result: result
    })
  }).catch(err => {
    res.status(400).json({
      error: err
    });
  });
})


router.delete('/:orderId', (req, res, next) => {
  Order.revove({_id: req.params.orderId}).exec()
  .then(result => {
    console.log(result);
    res.status(200).json({
      result: result
    });
  })
  .catch(err => {
    res.status(400).json({
      error: err
    });
  });
});

module.exports = router;
