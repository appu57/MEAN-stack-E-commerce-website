const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var passportLocalMongoose = require ('passport-local-mongoose');

var UserSchema = new Schema({
Username:{
   type:String,
   required:true
},
password:{
   type:String,
   required:true
},

   Age: {
      type: String,
      required:true

   },
   City: {
      type: String,
      required:true

   },
   State: {
      type: String,
      required:true

    
   },
   Email:{
      type: String,
      required:true


   }

});

UserSchema.plugin(passportLocalMongoose, {usernameFields: ["Username"]});

var Users = mongoose.model('User', UserSchema);

module.exports = Users;