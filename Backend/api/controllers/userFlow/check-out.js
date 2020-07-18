var _ = require('lodash');

module.exports = {

  friendlyName: 'Check out of a place',

  description: 'Add a visit to a place',

  inputs: {

    exitedDatetime: {
      required: true,
      type: 'string',
      description: 'ISO datetime'
    },

    visitId: {
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
        
    var visit = await Visit.updateOne({id: inputs.visitId}).set({
      departDateTime: inputs.exitedDatetime,
    })

    if(!visit){
      return exits.invalid({message: 'No visit with that ID found'})
    }

    return exits.success({
      message: 'Added checkout time',
      visit: visit
    })
  }

};
