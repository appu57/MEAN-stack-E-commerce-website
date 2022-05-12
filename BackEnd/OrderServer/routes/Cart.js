const express = require('express');
const CartRouter = express.Router();
const bodyparser = require('body-parser');

const Orders = require('../models/cart');

CartRouter.use(bodyparser.json());

CartRouter.route('/')
.get((req,res,next)=>{
    Orders.find({}).then((data)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(data);
    })
}) 

.post((req,res,next)=>{
    Orders.create(req.body)
    .then((data)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(data);
    },
    (err)=>next(err))
})

.delete((req,res,next)=>{
    Orders.remove(req.body)
    .then((data)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(data);
    })
});

CartRouter.route('/:CartId')
.get((req,res)=>{
    Orders.findById(req.params.CartId)
    .then((data)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(data);
    })
})

.post((req,res,next)=>{

        res.statusCode=500;
        res.setHeader('Content-Type','application/json');
        next(err);
  
})

.put((req,res,next)=>{
    Orders.findByIdAndUpdate(req.params.CartId,{$set:req.body},{new:true})
    .then((data)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(data);
    })
})

.delete((req,res,next)=>{
    Orders.findByIdAndDelete(req.params.CartId)
    .then((data)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(data);
    })
});

CartRouter.get('/category',(req,res,next)=>{
    Orders.find({fruits:true})
    .then((cart)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(cart);
    },
    (err)=>next(err))
});


module.exports = CartRouter;