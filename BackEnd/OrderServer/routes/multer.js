const express = require('express');
const bodyParser = require('body-parser');
const cart = require('../models/cart');
const authenticate = require('../authenticate');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter });

const uploadRouter = express.Router();

uploadRouter.use(bodyParser.json());



uploadRouter.route('/')
    .get((req, res, next) => {
        cart.find({}).then(Order => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(Order);

            // var object = [];
            //     object.push({
            //         name: Order.name,
            //         description: Order.description,
            //         price: Order.price,

            //         img:res.sendFile('/public'+Order.img),
            //         filename:Order.filename

                    
            //     });
            res.end();
            console.log(Order);
        },
        (err)=>next(err))
    })

    .delete((req, res, next) => {
        cart.remove(req.body)
            .then((data) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(data);
            })
    })

    //To add images the content type shld not be set or else set to multipart/form-data
    .post(upload.single('imageFile'), (req, res) => {
        const Prod = cart({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            img: 'http://localhost:3000/public/' + req.file.filename,
            filename:req.file.filename,
            fruits:req.body.fruits,   
            Groceries:req.body.Groceries,
            vegetables:req.body.vegetables 
        })
        Prod.save().then(user => {
            res.statusCode = 200;
            res.json(user);
            console.log(req.file,'storage', storage,user);


        })


    });


module.exports = uploadRouter;