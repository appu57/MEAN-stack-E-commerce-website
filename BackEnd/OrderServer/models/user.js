const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
require('mongoose-currency').loadType(mongoose);
var currency = mongoose.Types.Currency;
var OrderSchema=require('./cart');

var UserSchema = new Schema({
   Username: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },

   Age: {
      type: String,
      required: true

   },
   City: {
      type: String,
      required: true

   },
   State: {
      type: String,
      required: true


   },
   Email: {
      type: String,
      required: true


   },
   Admin: {
      type: Boolean,
      default: false
   },
   addtocart: [{
      name: {
         type: String,
         required: true,
         
     },
     description: {
         type: String,
         required: true
     },
     price: {
         type: currency,
         required: true,
         min: 0
     },
     productType: {
         type:String,
         required:true
     },
     
     image: {
         img: String
   }
   }]

});

UserSchema.plugin(passportLocalMongoose, { usernameFields: ["Username"] });

var Users = mongoose.model('User', UserSchema);

module.exports = Users;