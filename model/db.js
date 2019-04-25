const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sumocabapp', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./user.model');
require('./driver.model');
require('./vehicle.model');
require('./trip.model');
require('./vehicle_document.model');
require('./coupon_discount.model');