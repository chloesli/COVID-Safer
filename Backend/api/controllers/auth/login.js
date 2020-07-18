/**
 * LoginController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var jwt = require('jsonwebtoken')

module.exports = {

  friendlyName: 'Login',


  description: 'Log in using the provided email and password combination.',


  extendedDescription:
`This action attempts to look up the user record in the database with the
specified email address.  Then, if such a user exists, it uses
bcrypt to compare the hashed password from the database with the provided
password attempt.`,


  inputs: {

    emailAddress: {
      type: 'string',
      required: true
    },

    password: {
      description: 'The unencrypted password to try in this attempt, e.g. "passwordlol".',
      type: 'string',
      required: true
    },

  },


  exits: {

    success: {
      description: 'The requesting user agent has been successfully logged in.',
    },

    badCombo: {
      description: `The provided Real Deal Number/ABF Number and password combination does not
      match any user in the database.`,
      responseType: 'unauthorized',
      message: 'The provided Real Deal Number/ABF Number and password combination are incorrect'
    }

  },


  fn: async function (inputs, exits) {
    var userRecord = await User.findOne({
      emailAddress: inputs.emailAddress
    });

    if(!userRecord){
      return exits.badCombo({
        message: 'The provided email address or password combination are incorrect'
      });
    }

    // If the password doesn't match, then also exit thru "badCombo".
    await sails.helpers.passwords.checkPassword(inputs.password, userRecord.password)
    .intercept({ code: 'incorrect' }, ()=> {return {'badCombo': {message: 'The provided email address or password combination are incorrect'} }});

    //Delete password before sending response
    delete userRecord.password;

    // if no errors were thrown, then grant them a new token
    // set these config vars in config/local.js, or preferably in config/env/production.js as an environment variable
    // The JWT stores the User object
		var token = jwt.sign({user: userRecord}, 'default_secret', {expiresIn: sails.config.custom.jwtExpires})
		// set a cookie on the client side that they can't modify unless they sign out (just for web apps)
		this.res.cookie('sailsjwt', token, {
			signed: true,
			maxAge: sails.config.custom.jwtExpires
		})
		// provide the token to the client in case they want to store it locally to use in the header (eg mobile/desktop apps)

    return exits.success({
      message: 'User logged in',
      user: userRecord,
      token
    })
  }

};
