var mongoose = require('mongoose');
var schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var currency = mongoose.Types.Currency;


var OrderSchema = new schema({
    name: {
        type: String,
        required: true,
        unique: true
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
    filename: String,
    image: [{
        img: String,
        filename:String
    }]
 





});


var Orders = mongoose.model('Order', OrderSchema);

module.exports = Orders;