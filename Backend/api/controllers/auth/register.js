/**
 * RegisterController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var jwt = require('jsonwebtoken')
var _ = require('lodash');

module.exports = {

  friendlyName: 'Signup',

  description: 'Sign up for a new user account.',

  extendedDescription:
  `This creates a new user record in the database, signs in the requesting user agent
  by modifying its [session](https://sailsjs.com/documentation/concepts/sessions), and
  (if emailing with Mailgun is enabled) sends an account verification email.

  If a verification email is sent, the new user's account is put in an "unconfirmed" state
  until they confirm they are using a legitimate email address (by clicking the link in
  the account verification message.)`,

  inputs: {

    emailAddress: {
      required: true,
      type: 'string',
      isEmail: true,
      description: 'The email address for the new account, e.g. m@example.com.',
      extendedDescription: 'Must be a valid email address.',
    },

    password: {
      required: true,
      type: 'string',
      maxLength: 200,
      example: 'passwordlol',
      description: 'The unencrypted password to use for the new account.'
    },

    firstName:  {
      required: true,
      type: 'string',
      example: 'Frida',
      description: 'The user\'s first name.',
    },

    lastName:  {
      required: true,
      type: 'string',
      example: 'Kahlo',
      description: 'The user\'s last name.',
    },

    address: {
      required: false,
      type: 'string',
      defaultsTo: "",
      description: 'Users address'
    },

    ageRange: {
      type: 'string',
      required: false,
      defaultsTo: "",
      description: 'Age range of users',
    },

    isBusiness: {
      type: 'boolean',
      defaultsTo: false,
    },

  },

  exits: {

    success: {
      description: 'New user account was created successfully.',
    },

    invalid: {
      responseType: 'serverError',
      description: 'The provided fullName, password and/or email address are invalid.',
      extendedDescription: 'If this request was sent from a graphical user interface, the request '+
      'parameters should have been validated/coerced _before_ they were sent.'
    },

  },

  fn: async function (inputs, exits) {

    console.log("password of user is ", inputs.password);

    //Checking if users exist in the database with same email
    var usersWithSameEmail = await User.find({
      where: {emailAddress: inputs.emailAddress.toLowerCase()},
    });

    sails.log('There are %d users with same email.  Check it out:', usersWithSameEmail.length, usersWithSameEmail);

    //There are users with the same email in the database, if greater than or equal to 2 throw maxUsersAssociatedWithEmail exit
    if(usersWithSameEmail.length >= 1){
      return exits.invalid({
        message: 'There is already 1 email associated with same email'
      });
    }

    var newUserRecord = await User.create(_.extend({
      emailAddress: inputs.emailAddress.toLowerCase(),
      firstName: inputs.firstName.toLowerCase(),
      lastName: inputs.lastName.toLowerCase(),
      address: inputs.address,
      ageRange: inputs.ageRange,
      isBusiness: inputs.isBusiness,
      password: await sails.helpers.passwords.hashPassword(inputs.password),
    }))
    .intercept({name: 'UsageError'}, 'invalid')
    .fetch();

    //Delete password before sending response
    delete newUserRecord.password;

    // after creating a user record, log them in at the same time by issuing their first jwt token and setting a cookie
    // The JWT stores the User object
    var token = jwt.sign({user: newUserRecord}, 'default_secret', {expiresIn: sails.config.custom.jwtExpires})

    this.res.cookie('sailsjwt', token, {
      signed: true,
      maxAge: sails.config.custom.jwtExpires
    })

    //Return relevant success message and rdbNumber
    return exits.success({
      message: 'new User created',
      user: newUserRecord,
      token
    })
  }

};
