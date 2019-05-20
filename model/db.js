const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sumocabapp', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});




// let url = process.env.MONGODB_URI || 'mongodb://27.0.0.1/sumocabapp';
// mongoose.connect(url, { useMongoClient: true }, (err) =>{
//     if (!err) { console.log('MongoDB Connection Succeeded.') }
//  else { console.log('Error in DB connection : ' + err) }
// });

require('./user.model');
require('./driver.model');
require('./vehicle.model');
require('./trip.model');
require('./vehicle_document.model');
require('./coupon_discount.model');
require('./payment.model');
require('./vehicle_type.model');