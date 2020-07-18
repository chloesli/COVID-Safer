var _ = require('lodash');
var moment = require('moment');

module.exports = {

  friendlyName: 'Add a visit to a place',

  description: 'Add a visit to a place',

  inputs: {

    enteredDatetime: {
      required: true,
      type: 'string',
      description: 'ISO datetime'
    },

    placeId: {
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
    //Create a visit w/ datetime & id 
    var place = await Place.findOne({id: inputs.placeId});
    
    if(!place){
      return exits.invalid({message: 'No place with that ID found'})
    }

    var visit = await Visit.create({
      arrivalDateTime: inputs.enteredDatetime,
      owningUser: this.req.user.id
    }).fetch();

    console.log(place, visit);

    await Place.addToCollection(place.id, 'visitor', visit.id);
    
    var visit = await Visit.findOne({id: visit.id}).populate('places')

    //Add to user collection???
    // Place.addToCollection({})

    //Return relevant success message
    return exits.success({
      message: 'new Visit created',
      visit: visit,
    })
  }

};
