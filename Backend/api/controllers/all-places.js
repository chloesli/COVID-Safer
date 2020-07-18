module.exports = {

  friendlyName: 'Add a visit to a place',

  description: 'Add a visit to a place',

  inputs: {

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

    var allPlaces = await Place.find();

    //Return relevant success message
    return exits.success(allPlaces);
  }

};
