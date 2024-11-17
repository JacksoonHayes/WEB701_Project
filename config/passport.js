const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/userModel');

// Passport JWT Strategy for authenticating users
module.exports = function(passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); // Extract the JWT from the header of the request
    opts.secretOrKey = process.env.JWT_SECRET || 'secret'; // Use the secret key from the .env file or use the string 'secret'

    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {  // Use the JWT strategy to authenticate the user
        try {
            const user = await User.findById(jwt_payload.id);  // Find the user by the ID from the JWT payload
            if (user) { // If the user is found, return the user
                return done(null, user);
            } else { // If the user is not found, return false
                return done(null, false);
            }
        } catch (error) {
            return done(error, false);
        }
    }));
};
