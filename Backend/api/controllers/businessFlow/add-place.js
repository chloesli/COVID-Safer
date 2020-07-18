var _ = require('lodash');

module.exports = {

  friendlyName: 'Add a place',

  description: 'Add a place as a business user',

  inputs: {

    name: {
      required: true,
      type: 'string',
    },

    address: {
      required: true,
      type: 'string',
    },

    suburb:  {
      required: true,
      type: 'string',
    },

    postcode:  {
      required: true,
      type: 'number',
    },

  },

  exits: {

    success: {
      description: '',
    },

    invalid: {
      responseType: 'serverError',
      description: 'The provided fullName, password and/or email address are invalid.',
      extendedDescription: 'If this request was sent from a graphical user interface, the request '+
      'parameters should have been validated/coerced _before_ they were sent.'
    },

  },

  fn: async function (inputs, exits) {

    //Check if user is a business user
    if(!this.req.user.isBusiness){
      return exits.invalid({message: 'You aren\'t a business user'})
    }

    var newPlace = await Place.create({
      locationName: inputs.name,
      address: inputs.address,
      suburb: inputs.suburb,
      postcode: inputs.postcode,
      businessUser: this.req.user.id
    }).fetch();

    //

    //Return relevant success message
    return exits.success({
      message: 'new Place created',
      place: newPlace,
    })
  }

};
