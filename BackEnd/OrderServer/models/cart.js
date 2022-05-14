var mongoose = require('mongoose');
var schema = mongoose.Schema;
 require('mongoose-currency').loadType(mongoose);
 var currency=mongoose.Types.Currency;
  

var OrderSchema = new schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
     description:{
         type:String,
         required:true
     },
     price:{
       type:currency,
       required:true,
       min:0
     },
     fruits:{
         type:Boolean,
         default:false
     },
     Vegetables:{
        type:Boolean,
        default:false
     },
     Groceries:{
        type:Boolean,
        default:false
     },
     img:[
         {
            data:Buffer
                 }
     ]
     


});


var Orders= mongoose.model('Order', OrderSchema);

module.exports = Orders;