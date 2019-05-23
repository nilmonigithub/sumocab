const expressJwt = require('express-jwt');
const config = require('../config.json');
const userService = require('../api/users/user.service');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/api/users/authenticate',
            '/api/users/register',
			'/api/users/getAll',
			//'/api/users/:id',
			//'/userotps/get_otp',
			//'/userotps/otpcheck',
			'/api/vehicles/allvehicle',
			'/api/vehicles/add_vehicle',
			//'/vehicles/get_vehicletype/:id',
			'/api/trips/add_trip',
			'/api/trips/alltrip',
			'/api/trips/tripdetails'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};