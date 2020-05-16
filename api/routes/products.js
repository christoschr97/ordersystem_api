const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  // reject a file
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// const upload = multer({dest: 'uploads/'});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024*1024*50
  },
  fileFilter: fileFilter
});


const Product = require('../models/product');

router.get('/', (req, res, next) => {
  Product.find().then(data => {
    // res.status(200).json({
    //   products: data
    // });
    res.status(200).json(data);
  })
  .catch(err => {
    res.status(400).json({
      error: err
    })
  })
});


//to accept images wee need to send form/data rather than raw json
//we will use multer which is an alternative to body parser for form/data
router.post('/', upload.single('productImage') ,(req, res, next) => {
  console.log(req.file);
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImageUrl: req.file.originalname //path for the whole path uploads/filename.extension
  });
  // store this in a database
  product
  .save()
  .then(result => {

    console.log(result);
    res.status(200).json({
      message: "Handling POST requests to /products",
      craetedProduct: product
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  });


});

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
  .exec()
  .then(doc => {
    console.log(doc);
    // wee add the check bellow because if there is a valid id but not exist in database, then it returns null.
    if(doc) {
      res.status(200).json(doc)
    } else {
      res.status(404).json({
        message: 'No valid entry found for provided id'
      })
    }
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

router.put('/:productId', (req, res, next) => {
  Product.findOneAndUpdate({_id: req.params.productId}, {name: req.body.name},
    {
      new: true,                       // return updated doc
      runValidators: true              // validate before update
    }).then((doc) => {
      console.log(doc)
    }).catch((err) => {
      console.log(err)
    })
});

router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.remove({_id: id}).then(result => {
    res.status(200).json(result);
  }).catch(err => {
    console.log(err)
    res.status(400).json({
      error: err
    })
  })
});

module.exports = router;





// the post route before the upload image added for backup
// router.post('/', (req, res, next) => {
//   const product = new Product({
//     _id: new mongoose.Types.ObjectId(),
//     name: req.body.name,
//     price: req.body.price
//   });
//   // store this in a database
//   product
//   .save()
//   .then(result => {
//
//     console.log(result);
//     res.status(200).json({
//       message: "Handling POST requests to /products",
//       craetedProduct: product
//     });
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).json({
//       error: err
//     })
//   });
//
//
// });
