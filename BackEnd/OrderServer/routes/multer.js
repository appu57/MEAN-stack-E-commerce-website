const express = require('express');
const bodyParser = require('body-parser');
const cart = require('../models/cart');
const authenticate = require('../authenticate');
const multer = require('multer');
const Users = require('../models/user');
const { UpgradeRequired } = require('http-errors');


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
            console.log(Order);

            //     });
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(Order);
        },
            (err) => next(err))
    })

    .delete((req, res, next) => {
        cart.remove(req.body)
            .then((data) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(data);
            })
    })
    //To add images the content type shld not be set or else set to multipart/form-data
    .post((req, res) => {
        const Prod = cart({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            productType: req.body.productType,

        })
        Prod.save()
            .then(user => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ user: user });
                console.log(req.file, 'storage', storage, user);


            })


    });
uploadRouter.route('/:cartId/image')
    //To add images the content type shld not be set or else set to multipart/form-data
    .post(upload.single('imageFile'), (req, res) => {

        cart.findById(req.params.cartId)
            .then((Products) => {
                Products.image.push({ img: "http://localhost:3000/public/" + req.file.filename, filename: req.file.filename });
                Products.save().then((Cart) => {
                    res.statusCode = 200;
                    res.json(Products);
                    console.log(Cart);
                })


            })




    })
    .put((req, res, next) => {
        cart.findByIdAndUpdate(req.params.cartId, { $set: req.body }, { new: true })
            .then((product) => {
                res.statusCode = 200;
                res.json(product);

            })
            .catch((err) => {
                res.json(err);
            })
    })
    .delete((req, res, next) => {
        cart.findByIdAndDelete(req.params.cartId)
            .then((Product) => {
                res.statusCode = 200;
                res.json(Product);
            })
    });
//To get all fruits 
uploadRouter.get('/fruits', (req, res, next) => {
    cart.find({ productType: 'fruits' })
        .then((product) => {
            res.statusCode = 200;
            res.json(product);
        })
});
//To get all Vegetables
uploadRouter.get('/Vegetables', (req, res, next) => {
    cart.find({ productType: 'Vegetables' })
        .then((product) => {
            res.statusCode = 200;
            res.json(product);
        })
});
//add each item to users 
uploadRouter.route("/addtocart/:userId")
    .post((req, res) => {
        Users.findById(req.params.userId).then((usercart) => {
            usercart.addtocart.push(req.body)
            usercart.save().then((added) => {
                res.statusCode = 200;
                res.json(added);
            })
        })

    });
//delete each item from the add to cart
uploadRouter.route("/:usersId/deletefromcart/:addedId")
    .delete((req, res, next) => {
        Users.findById(req.params.usersId)
            .then((user) => {
                user.addtocart.id(req.params.addedId).remove();
                user.save()
                    .then((deleted) => {
                        res.statusCode = 200;
                        res.json(deleted);
                    })
            })
    });

//To display a single product in view component
uploadRouter.route("/viewproduct/:id")
    .get((req, res, next) => {
        cart.findById(req.params.id)
            .then((found) => {
                res.statusCode = 200;
                res.json(found);
            })
    });

uploadRouter.route("/searchedprod/:name")
    .get((req, res, next) => {
        cart.find({ name: req.params.name })
            .then((searched) => {
                res.statusCode = 200;
                res.json(searched);
            })
    });

//To check if the product is already present in the cart
uploadRouter.route("/:userId/checkifproductpresent/:prodId")
    .get((req, res, next) => {
        Users.findById(req.params.userId)
            .then((founduser) => {
                res.statusCode = 200;
                res.json(founduser.addtocart.id(req.params.prodId));

            })
    });

//If present update the quantity
uploadRouter.route("/:userId/updatequantity/:prodId")
    .put((req, res, next) => {
        Users.findById(req.params.userId)
            .then((founduser) => {
                founduser.addtocart.id(req.params.prodId).quantity = req.body.quantity;
                founduser.save().then((savedquantity) => {
                    res.statusCode = 200;
                    res.json(savedquantity);
                })
            })
    });

//Once ordered delete the cart items
// uploadRouter.route("/:userId/Deletecart")
//     .delete((req, res, next) => {
//         Users.findById(req.params.userId)
//             .then((foundusers) => {
//                 foundusers.addtocart.deleteMany()
//                     foundusers.save().then((deleted) => {
//                         res.statusCode = 200;
//                         res.json(deleted);
//                     })
//             })
//     });

module.exports = uploadRouter;