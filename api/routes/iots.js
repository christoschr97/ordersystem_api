const express = require('express')
const router = express.Router();
const Iot = require('../models/iot');
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
    res.status(200).json('Get is not used somewhere')
});

router.post('/', (req, res, next) => {
    console.log(req.body);
    const iot = new Iot({
        _id: new mongoose.Types.ObjectId(),
        battery: req.body.payload_fields.battery,
        light: req.body.payload_fields.light,
        event: req.body.payload_fields.event,
        temperature: req.body.payload_fields.temperature
      })

      iot.save().then(result => {
        console.log(result);
        res.status(200).json({
          result: result
        })
      }).catch(err => {
        res.status(400).json({
          error: err
        })
    })
    console.log("Payloads received: ")
    console.log(req.body.payload_fields);
    // res.status(200).json(req.body);
})

module.exports = router;
