/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to require an authenticated user, or else redirect to login page
 *                 Looks for an Authorization header bearing a valid JWT token
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
var jwt = require('jsonwebtoken')

module.exports = async function(req, res, next) {
	sails.helpers.verifyToken(req)
	.switch({
		error: function(err) {
			return res.serverError(err)
		},
		invalid: function(err) {
            return res.serverError('Unsupplied or incorrect JWT');
		},
		success: function() {
			// user has been attached to the req object (ie logged in) so we're set, they may proceed
			return next()
		}
	})
}
